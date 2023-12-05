import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { EncryptText } from "../../Encrypt/CryptoEncryption";

const MockExamOptions = () => {
  const { userProfileData } = useSelector((state) => state.postResp);
  const { preferredCourseDetails } = useSelector((state) => state.utils);
  return (
    <article
      className="modal fade"
      id="availableExamTest"
      tabIndex="-1"
      aria-labelledby="syllabusModalLabel"
      aria-hidden="true"
    >
      <section className="modal-dialog modal-dialog-scrollable downloadModal">
        <section className="modal-content bg-logo">
          <header className="modal-header modal-header-container">
            <h5 className="modal-title main-color" id="syllabusModalLabel">
              CUET(UG)-MOCK EXAM (SIMULATION)
            </h5>
            <button
              id="underStoodBack"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </header>

          <main className="modal-body">
            {preferredCourseDetails?.map((item) => {
              return (
                <section
                  key={item}
                  className="test-available-design modal-body-main-test"
                >
                  <p className="m-0 text-center font-weight-bold">
                    You can experience the CUET(UG) registration process, real
                    exam environment and post exam application process{" "}
                  </p>
                  <div className="d-flex flex-column gap-2">
                    <button
                      style={{
                        color: "white",
                        minWidth: "220px",
                      }}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#availableModal1"
                      className="btn main-btn "
                    >
                      Mock Exam
                    </button>
                    {/* <a
                      style={{
                        color: "white",
                        minWidth: "220px",
                      }}
                      target="_blank"
                      href={`https://besst.in/cuet_simulation/cuet_nta_mock_simulation_login?email=${encodeURIComponent(
                        EncryptText(userProfileData.email)
                      )}&token=${Cookies.get("token")}`}
                      className="btn main-btn "
                    >
                      Mock Registration
                    </a>
                    <a
                      style={{
                        color: "white",
                        minWidth: "230px",
                      }}
                      target="_blank"
                      href={`http://68.178.172.171:8081/universityOfDelhi/`}
                      className="btn main-btn "
                    >
                      Mock Post Exam Phase 1
                    </a>
                    <button
                      style={{
                        color: "white",
                        minWidth: "220px",
                      }}
                      type="button"
                      className="btn main-btn"
                      // data-bs-dismiss='modal'
                      data-bs-toggle="modal"
                      data-bs-target="#availableModal2"
                      aria-label="close"
                    >
                      Mock Post Exam Phase 2
                    </button> */}
                  </div>
                </section>
              );
            })}
          </main>
        </section>
      </section>
    </article>
  );
};

export default MockExamOptions;
