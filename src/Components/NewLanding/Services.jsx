import exam from "../../Assets/images/exam.png";
import tenth from "../../Assets/images/10th.png";
import counselling from "../../Assets/images/counselling.png";
import twelvth from "../../Assets/images/12th.png";
import classname1 from "../../Assets/images/class.png";
import student from "../../Assets/images/students.png";

//data for services
const services = [
	{
		title: "CUET Entrance",
		desc: "Common University Entrance Test Support",
		img: exam,
	},
	{
		title: "Online counselling",
		desc: "Counselling for admissions",
		img: counselling,
	},
	{
		title: "SEBA Board",
		desc: "10th Board Exam",
		img: tenth,
	},
	{
		title: "AHSEC Board",
		desc: "12th Board Exam",
		img: twelvth,
	},
	{
		title: "Online classes",
		desc: "Classes for General Test paper for CUET",
		img: classname1,
	},
	{
		title: "Other Competitive Exams",
		desc: "Other Competitive Exams",
		img: student,
	},
];

const Services = () => {
	return (
		<article className='pt-5' id='services'>
			<section className='d-flex flex-column container mx-auto'>
				<header>
					<h4 className='mb-4 fs-2 text-center'>Services</h4>
				</header>
				<main className='p-4 services-container'>
					{services.map(({ title, desc, img }, index) => (
						<div
							className='card-landing border service-item'
							key={index}
						>
							<img
								src={img}
								height='60px'
								width='60px'
								alt={title}
							/>
							<h5 className='dark-grey'>{title}</h5>
							<p>{desc}</p>
						</div>
					))}
				</main>
			</section>
		</article>
	);
};

export default Services;
