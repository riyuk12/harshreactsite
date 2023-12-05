import { Link, useLocation } from "react-router-dom";

import qrCode from "../../../Assets/images/qr-code.jpeg";
import { privacyPolicy, termsAndConditions } from "../../../RouteConstants";

const LandingPageFooter = () => {
	const location = useLocation();
	return (
		<footer className='footer large-footer main-color-bg border-top fw-light white'>
			<div>
				<ul className='footer-links-container flex-sm-row flex-column p-0'>
					<li>
						<Link to={termsAndConditions} target='_blank'>
							Terms And Conditions
						</Link>
					</li>
					<li>
						<span className='d-sm-inline d-none'>|</span>
					</li>
					<li>
						<Link to={privacyPolicy} target='_blank'>
							Privacy Policy
						</Link>
					</li>
				</ul>
				<p className='m-0' style={{ textAlign: "center" }}>
					Copyright &#169; 2023 BESST(Brahmaputra Exam Success Support
					Team Private Limited )
				</p>
			</div>
			{location.pathname === "/" && (
				<img src={qrCode} alt='qr-code' className='qr-code-img' />
			)}
		</footer>
	);
};

export default LandingPageFooter;
