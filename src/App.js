import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./Pages/Landing/Landing";
import ViewTest from "./Pages/ViewTest/ViewTest";
import ExamTestInstructions from "./Pages/StudentMCQ/ExamTestInstructions";
import TestSubmit from "./Pages/TestSubmit/TestSubmit";
import ReviewTest from "./Pages/ReviewTest/ReviewTest";
import MCQ from "./Pages/MCQ/MCQ";
import Feedback from "./Pages/Feedback/Feedback";
import Gateway from "./Pages/Payment/Gateway";
import Invoice from "./Pages/Payment/Invoice";
import Teachers from "./Pages/Teachers/Teachers";
import IndividualTeacher from "./Pages/Teachers/IndividualTeacher";
import PaymentConfirmation from "./Pages/PaymentConfirmation/PaymentConfirmation";
import MySubscription from "./Pages/MySubscription/MySubscription";
import StudentMCQ from "./Pages/StudentMCQ/StudentMCQ";
import PrivateRoute from "./Utils/PrivateRoute";
import StudentExamTestMcq from "./Pages/StudentMCQ/StudentExamTestMcq";
import ExamQuizSummuryMCQ from "./Pages/StudentMCQ/ExamQuizSummury";
import SubmitExam from "./Pages/StudentMCQ/SubmitExam";
import StudentFeedback from "./Pages/StudentMCQ/StudentFeedback";
import FeedbackForm from "./Pages/StudentMCQ/FeedbackForm";
import ExamViewTest from "./Pages/StudentMCQ/ExamViewTest";
import ShowSubscriptionModal from "./Components/NewLanding/ShowSubscriptionModal";
import BesstNewExamPage from "./Pages/SEOPages/BesstNewExamPage";
import BestOnlinePlatform from "./Pages/SEOPages/BestOnlinePlatform";
import CuetExam from "./Pages/SEOPages/CuetExam";
import CuetApplicationForm from "./Pages/SEOPages/CuetApplicationForm";
import StartTestReview from "./Pages/SEOPages/StartTestReview";
import Reviews from "./Pages/Landing/LandingPageComponents/Reviews";
import ViewAllExamTest from "./Pages/SEOPages/ViewAllExamTest";
import CuetOnlineTestPaper from "./Pages/SEOPages/CuetOnlineTestPaper";
import StudyWithCUET from "./Pages/SEOPages/StudyWithCUET";
import CompetitiveExamSeo from "./Pages/SEOPages/CompetitiveExamSeo";
import EducationalplatformSeo from "./Pages/SEOPages/EducationalplatformSeo";
import PdfTest from "./Pages/StudentMCQ/PdfTest";
import {
  faqRoute,
  mcqTest,
  payHistory,
  privacyPolicy,
  profile,
  register,
  studDashboard,
  subscriptions,
  termsAndConditions,
  testSubmit,
  viewTest,
  seoPageRoutes,
  routes,
} from "./RouteConstants";
import "./App.css";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermCondition from "./Pages/TermCondition";
import CuetRegistration from "./Pages/SEOPages/CuetRegistration";
import CuetExamSeo from "./Pages/SEOPages/CuetExamSeo";
import PrivateRouter from "./Utils/PrivateRouter";
import Payment from "./Pages/Payment/Payment";
import BesstOnlineCoaching from "./Pages/SEOPages/BesstOnlineCoaching";
import SubjectiveQuestAns from "./Pages/SubjectiveQuestAns/SubjectiveQuestAns";
import LiveQuiz from "./Pages/LiveQuiz";
import LiveQuizLeaderBoard from "./Pages/LiveQuizLeaderBoard";
import LiveQuizInstructions from "./Pages/LiveQuizInstructions";
import Sign_up from "./Components/Copy/Auth/Signup/Sign_up";
import Sign_In from "./Components/Copy/Auth/Signin/Sign_in";
import Contact_us from "./Components/Copy/Pages/Contact_Us";
import About_us from "./Components/Copy/Pages/About_us";
import SignInOtp from "./Components/Copy/Auth/Signin/SignIn_OTP";
import ForgotPassword from "./Components/Copy/Auth/ForgotPassword/ForgotPassword";
import SuccessTories from "./Components/Copy/Pages/SuccessStory";
import CuetUGCourse from "./Components/Copy/Courses/CuetUGCourse";
import "./AppCopy.css";
import NavBar from "../src/Components/Copy/Navbar/Navbar";
import Footer from "../src/Components/Copy/AboutUs/AboutUs";
const PaymentList = lazy(() => import("./Pages/PaymentHistory/PaymentList"));
const LandingNew = lazy(() => import("./Pages/NewLANDING/LandingNew"));
const Register = lazy(() => import("./Pages/Register/Register"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
// const Payment = lazy(() => import("./Pages/Payment/Payment"));
const FAQ = lazy(() => import("./Pages/FAQ/FAQ"));
const Mcq = lazy(() => import("./Pages/MCQ/MCQ"));
const StudentDashboard = lazy(() =>
  import("./Pages/StudentDashboard/StudentDashboard")
);

function App() {
  return (
    <>
      <Router basename="/">
        <NavBar />
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" exact element={<LandingNew />} />
            <Route path="/signup" element={<Sign_up />} />
            <Route path="/signin" element={<Sign_In />} />

            <Route path="/contact" element={<Contact_us />} />
            <Route path="/about" element={<About_us />} />
            <Route path="/success-stories" element={<SuccessTories />} />
            <Route path="/cuetugcource" element={<CuetUGCourse />} />
            <Route path="/moketest" element={<About_us />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/SignInOtp" element={<SignInOtp />} />

            <Route path={faqRoute} element={<FAQ />} />
            <Route path={subscriptions} element={<Payment />} />
            <Route path={mcqTest} element={<Mcq />} />
            <Route path={register} element={<Register />} />
            <Route path={viewTest} element={<ViewTest />} />
            <Route
              path={routes.subjectiveQuest}
              element={<SubjectiveQuestAns />}
            />
            <Route path={privacyPolicy} element={<PrivacyPolicy />} />
            <Route path={termsAndConditions} element={<TermCondition />} />
            <Route path={testSubmit} element={<TestSubmit />} />
            <Route path={routes.liveQuiz} element={<LiveQuiz />} />

            {/* authorized routes */}
            <Route
              path={studDashboard}
              element={<PrivateRouter Component={StudentDashboard} />}
            ></Route>
            <Route
              path={profile}
              element={<PrivateRouter Component={Profile} />}
            />
            <Route
              path={payHistory}
              element={<PrivateRouter Component={PaymentList} />}
            ></Route>

            <Route
              path={routes.liveQuizLeaderBoard}
              element={<LiveQuizLeaderBoard />}
            />

            <Route path="/StudentFeedback" element={<StudentFeedback />} />

            <Route
              path="/quiz-instructions"
              element={<LiveQuizInstructions />}
            />

            <Route element={<PrivateRoute />}>
              <Route path="/page" element={<Landing />} />
              <Route
                path="/ShowSubscriptionModal"
                element={<ShowSubscriptionModal />}
              />

              {/* <Route
								path='/student-mcq'
								element={<StudentMCQ />}
							/> */}

              <Route
                path="/ExamTestInstructions"
                element={<ExamTestInstructions />}
              />

              <Route path="/pdftestexam" element={<PdfTest />} />
              <Route
                path="/paymentConfirmation"
                element={<PaymentConfirmation />}
              />
              <Route path="/reviews" element={<Reviews />} />

              <Route path="/studentMCQ" element={<MCQ />} />
              <Route path="/examviewtest" element={<ExamViewTest />} />
              <Route path="/reviewTest" element={<ReviewTest />} />
            </Route>

            <Route
              path="/studentExamTestMcq"
              element={<StudentExamTestMcq />}
            />

            <Route path="/FeedbackForm" element={<FeedbackForm />} />

            <Route path="/mySubscriptions" element={<MySubscription />} />

            <Route
              path="/ExamQuizSummuryMCQ"
              element={<ExamQuizSummuryMCQ />}
            />
            <Route path="/SubmitExam" element={<SubmitExam />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/payment-gateway" element={<Gateway />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route
              path="/individualteacher/:id"
              element={<IndividualTeacher />}
            />

            {/* seo page routes */}
            <Route
              path={seoPageRoutes.besstNewExamPage}
              element={<BesstNewExamPage />}
            />
            <Route
              path={seoPageRoutes.onlineCoaching}
              element={<BesstOnlineCoaching />}
            />
            <Route
              path={seoPageRoutes.bestOnlinePlatform}
              element={<BestOnlinePlatform />}
            />
            <Route
              path={seoPageRoutes.competitiveExamSeo}
              element={<CompetitiveExamSeo />}
            />
            <Route
              path={seoPageRoutes.cuetApplicationForm}
              element={<CuetApplicationForm />}
            />
            <Route path={seoPageRoutes.cuetExam} element={<CuetExam />} />
            <Route path={seoPageRoutes.cuetExamSeo} element={<CuetExamSeo />} />
            <Route
              path={seoPageRoutes.cuetOnlineTestPaper}
              element={<CuetOnlineTestPaper />}
            />
            <Route
              path={seoPageRoutes.cuetRegistration}
              element={<CuetRegistration />}
            />
            <Route
              path={seoPageRoutes.educationalplatformSeo}
              element={<EducationalplatformSeo />}
            />
            <Route
              path={seoPageRoutes.startTestReview}
              element={<StartTestReview />}
            />
            <Route
              path={seoPageRoutes.studyWithCUET}
              element={<StudyWithCUET />}
            />
            <Route
              path={seoPageRoutes.viewAllExamTest}
              element={<ViewAllExamTest />}
            />
          </Routes>
        </Suspense>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
