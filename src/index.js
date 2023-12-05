import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "./index.css";
import "./Pages/Payment/payment.css";
import "./Pages/StudentDashboard/studentDashboard.css";
import "./Pages/SubjectiveQuestAns/SubjectiveQuestAns.css";
import App from "./App";
import store from "./Redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<HelmetProvider>
		<Provider store={store}>
			<App />
		</Provider>
	</HelmetProvider>
);
