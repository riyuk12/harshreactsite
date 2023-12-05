import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import News from "./HeadLine/News";
import CurrentAffairs from "./HeadLine/CurrentAffairs";
import homeB1 from "../../Assets/images/homeB1.png";
import homeB2 from "../../Assets/images/homeB2.png";
import homeB3 from "../../Assets/images/homeB3.png";
import homeB4 from "../../Assets/images/homeB4.png";
import homeB5 from "../../Assets/images/homeB5.png";
import { studDashboard } from "../../RouteConstants";

// style for carousel buttons
const carouselButtonStyle = {
	borderRadius: "50%",
	height: "10px",
	width: "10px",
	backgroundColor: "#7B1FA2",
};

const Headline = () => {
	return (
		<article className='d-flex flex-column py-3 px-sm-5 p-3 gap-4'>
			<section className='d-flex flex-column-reverse flex-md-row align-items-center justify-content-between gap-4'>
				<article className='p-sm-4'>
					<h1 className='hero-heading'>
						Brahmaputra Exam Success Support Team (BESST)
					</h1>
					<p className='hero-content'>
						Click below to explore more or register yourself to be a
						part of BESST family.
					</p>
					<section className='d-grid gap-2 d-md-flex justify-content-md-start'>
						{Cookies.get("token") ? (
							<>
								<a
									type='button'
									className='btn btn-outline-secondary px-4 px-3'
									href='#courseUpdate'
								>
									Explore
								</a>
								<Link
									type='button'
									className='btn main-btn px-4 px-3'
									to={studDashboard}
								>
									Go to Dashboard
								</Link>
							</>
						) : (
							<>
								<button
									type='button'
									className='btn main-btn fw-bold px-4'
									data-bs-toggle='modal'
									data-bs-target='#registerationModal'
								>
									Register
								</button>
								<a
									type='button'
									className='btn fw-bold btn-outline-secondary px-4'
									href='#courseUpdate'
								>
									Explore
								</a>
							</>
						)}
					</section>
				</article>
				<article className='col-sm-12 col-md-6'>
					<section
						id='carouselExampleIndicators'
						className='carousel slide'
						data-bs-ride='carousel'
						data-bs-interval='3000'
					>
						<div
							className='carousel-indicators'
							style={{ marginLeft: "5%" }}
						>
							<button
								style={carouselButtonStyle}
								className='active'
								type='button'
								data-bs-target='#carouselExampleIndicators'
								data-bs-slide-to='0'
								aria-current='true'
								aria-label='Slide 1'
							></button>
							<button
								style={carouselButtonStyle}
								
								type='button'
								data-bs-target='#carouselExampleIndicators'
								data-bs-slide-to='1'
								aria-label='Slide 2'
							></button>
							<button
								style={carouselButtonStyle}
								type='button'
								data-bs-target='#carouselExampleIndicators'
								data-bs-slide-to='2'
								aria-label='Slide 3'
							></button>
							<button
								style={carouselButtonStyle}
								type='button'
								data-bs-target='#carouselExampleIndicators'
								data-bs-slide-to='3'
								aria-label='Slide 4'
							></button>
							<button
								style={carouselButtonStyle}
								type='button'
								data-bs-target='#carouselExampleIndicators'
								data-bs-slide-to='4'
								aria-label='Slide 5'
							></button>
						</div>
						<div className='carousel-inner'>
							<div className='carousel-item'>
								<img
									src={homeB1}
									className='d-block carousel-img'
									alt='design for slide 1'
								/>
							</div>
							<div className='carousel-item'>
								<img
									src={homeB2}
									className='d-block carousel-img'
									alt='design for slide 2'
								/>
							</div>
							<div className='carousel-item'>
								<img
									src={homeB3}
									className='d-block carousel-img'
									alt='design for slide 3'
								/>
							</div>
							<div className='carousel-item'>
								<img
									src={homeB4}
									className='d-block carousel-img'
									alt='design for slide 4'
								/>
							</div>
							<div className='carousel-item'>
								<img
									src={homeB5}
									className='d-block carousel-img'
									alt='design for slide 5'
								/>
							</div>
						</div>
					</section>
				</article>
			</section>
			<section className='news-container'>
				<News />
				<CurrentAffairs />
			</section>
		</article>
	);
};

export default Headline;
