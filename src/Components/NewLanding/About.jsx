import about from "../../Assets/images/about.png";

const About = () => {
	return (
		<article className='pt-5 bg-white' id='about'>
			<section className='row align-items-center justify-content-center about-container'>
				<img
					src={about}
					className='mx-lg-auto img-fluid col-lg-6 col-md-12'
					alt='about us'
					width='700'
					height='500'
				/>
				<div className='col-lg-6 col-md-12 pt-5'>
					<h3>What is BESST?</h3>
					<p style={{ textAlign: "justify" }}>
						BESST (BRAHMAPUTRA EXAM SUCCESS SUPPORT TEAM PRIVATE
						LIMITED) is an online educational platform consisting of
						experienced teachers from all over the country, helping
						students to have hands-on online tests starting with
						CUET (UG) 2022. It will provide mock tests/practice
						tests and live classes. This platform will help students
						to excel in competitive exams.
					</p>
					<h3 className='mt-5'>How does BESST help students?</h3>
					<p style={{ textAlign: "justify" }}>
						BESST partners with teachers and faculties who have
						better experience of helping students to realise their
						full potential. It has a simulation platform wherein
						students can access notes by specialised teachers,
						guidance of previous year’s toppers, practice sessions,
						etc.
					</p>
				</div>
			</section>
		</article>
	);
};

export default About;
