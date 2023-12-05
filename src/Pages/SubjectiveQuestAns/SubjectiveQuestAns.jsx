import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import Header from "../../Components/Global/Navigation/Header";
import SwitchSubjectModal from "../../Components/SubjectiveQuestAns/Modals/SwitchSubjectModal";
import OneLinerFooter from "../../Components/Global/Footers/OneLinerFooter";
import { GetTopicListThunk } from "../../Redux/Thunks/Get/GetTopicListThunk";
import usePreferredSubjectId from "../../Utils/usePreferredSubjectId";
import { GetChaptersThunk } from "../../Redux/Thunks/Get/GetChaptersThunk";
import SubjectiveQuestNumbers from "../../Components/SubjectiveQuestAns/SubjectiveQuestNumbers";
import SubjectiveQuestAnswer from "../../Components/SubjectiveQuestAns/SubjectiveQuestAnswer";
import SubjectiveChapters from "../../Components/SubjectiveQuestAns/SubjectiveChapters";
import SubjectSwitchHeader from "../../Components/SubjectiveQuestAns/SubjectSwitchHeader";
import { GetSubjectiveQuestionAnsThunk } from "../../Redux/Thunks/Get/GetSubjectiveQuestionAnsThunk";
import usePreferredCourseId from "../../Utils/usePreferredCourseId";

const eng = "Only English";
const assamese = "Only Assamese";
const both = "Both";

const langs = [
  {
    language: eng,
  },
  {
    language: assamese,
  },
  {
    language: both,
  },
];

const SubjectiveQuestAns = () => {
  const [language, setLanguage] = useState(eng);
  const [selectedChapter, setSelectedChapter] = useState("");
  const { chapters } = useSelector((state) => state.response);
  const preferredSubjectId = usePreferredSubjectId();
  const preferredCourseId = usePreferredCourseId();
  const answerRefs = useRef([]);
  const dispatch = useDispatch();
  const { isChapterVisible } = useSelector((state) => state.utils);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  //getting list of topics for the switch course modal
  useEffect(() => {
    dispatch(
      GetTopicListThunk({
        token: Cookies.get("token"),
        id: preferredCourseId,
      })
    );
  }, []);

  //getting chapters based on preferred Subject
  useEffect(() => {
    if (preferredSubjectId) {
      dispatch(
        GetChaptersThunk({
          token: Cookies.get("token"),
          id: preferredSubjectId,
        })
      );
    }
  }, [preferredSubjectId]);

  //making the first chapter active on first render
  useEffect(() => {
    setSelectedChapter("Chapter Name");
    if (chapters !== null && chapters.length !== 0) {
      const firstChapter = chapters[0];
      const activeChapter = chapters.find(
        (item) => Number(item.id) === Number(firstChapter.id)
      );
      setSelectedChapter(activeChapter.chapterName);
      dispatch(
        GetSubjectiveQuestionAnsThunk({
          token: Cookies.get("token"),
          id: activeChapter.id,
          topicId: preferredSubjectId,
        })
      );
    }
  }, [chapters]);

  //handling the chapter selection
  const handleChapterChange = (id) => {
    const activeChapter = chapters.find(
      (item) => Number(item.id) === Number(id)
    );
    setSelectedChapter(activeChapter.chapterName);
    dispatch(
      GetSubjectiveQuestionAnsThunk({
        token: Cookies.get("token"),
        id: activeChapter.id,
        topicId: preferredSubjectId,
      })
    );
  };

  //handles the language changes
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <>
      {/* <Header /> */}
      <div className="px-sm-5 px-3">
        <SubjectSwitchHeader />
        <SubjectiveQuestNumbers answerRefs={answerRefs} />
        <article className="question-ans-chapter-container">
          <SubjectiveQuestAnswer
            language={language}
            langs={langs}
            eng={eng}
            both={both}
            assamese={assamese}
            answerRefs={answerRefs}
            selectedChapter={selectedChapter}
            handleChapterChange={handleChapterChange}
          />
          {isChapterVisible && (
            <section className="column-two-chapter-lang">
              <section
                className="lang-container"
                style={{
                  background: "#F0F0F0",
                  borderRadius: "8px",
                }}
              >
                <h5 className="m-0" style={{ fontSize: "18px" }}>
                  Language{" "}
                </h5>
                <div className="dropdown">
                  <button
                    className="dropdown-btn-lang dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {language}
                  </button>
                  <ul className="dropdown-menu">
                    {langs.map((item) => (
                      <li
                        key={item.language}
                        onClick={() => handleLanguageChange(item.language)}
                        className="dropdown-item py-2"
                      >
                        {item.language}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
              <SubjectiveChapters
                handleChapterChange={handleChapterChange}
                selectedChapter={selectedChapter}
              />
            </section>
          )}
        </article>
      </div>
      <SwitchSubjectModal />
      <OneLinerFooter />
    </>
  );
};

export default SubjectiveQuestAns;
