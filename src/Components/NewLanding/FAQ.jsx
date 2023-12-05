import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { faqRoute } from "../../RouteConstants";

//static data for faq
const faqData = [
	{
		query: "Are there any free practice papers?",
		answer: "Yes, there will be free practice papers.",
	},
	{
		query: "For which standard the courses are available?",
		answer: "Currently, we are providing guidance for CUET (UG)2022.",
	},
	{
		query: "Do I need to subscribe?",
		answer: "Yes, you need to subscribe for it.",
	},
	{
		query: "How can we contact and report an error, if found?",
		answer: "A student can contact with BESST team on given whatsapp number and also via email.",
	},
	{
		query: "Is regional language available?",
		answer: "Yes, regional language paper like Bengali and Assamese are available.",
	},
];

const FAQ = () => {
	return (
		<article className='bg-light' id='FAQ'>
			<section className='faq-container'>
				<header className='list-group-item bg-light fw-bolder fs-5 py-3 d-flex align-items-center gap-3'>
					<AiOutlineQuestionCircle />
					<h4 className='faq-heading'>Frequent Asked Questions</h4>
				</header>
				<ul className='list-group bg-body'>
					<li className='list-group-item list-group-item-white'>
						<section
							className='accordion accordion-flush bg-white'
							id='accordionFlushFAQ'
						>
							{faqData.map(({ query, answer }, index) => (
								<div
									className='accordion-item border rounded bg-white my-3 overflow-hidden'
									key={index}
								>
									<div
										className='accordion-header border-0'
										id='flush-headingOne'
									>
										<button
											className='accordion-button collapsed fw-bold'
											type='button'
											data-bs-toggle='collapse'
											data-bs-target={
												"#flush-collapseOne" + index
											}
											aria-expanded='false'
											aria-controls={
												"flush-collapseOne" + index
											}
										>
											{query}
										</button>
									</div>
									<div
										id={"flush-collapseOne" + index}
										className='accordion-collapse collapse'
										aria-labelledby='flush-headingOne'
										data-bs-parent='#accordionFlushFAQ'
									>
										<div className='accordion-body'>
											{answer}
										</div>
									</div>
								</div>
							))}
						</section>
						<section className='my-5'>
							<Link
								to={faqRoute}
								style={{ width: "10.12rem" }}
								className='btn btn-outline-secondary main-color mx-auto d-block fw-bolder text-uppercase'
							>
								Veiw More
							</Link>
						</section>
					</li>
				</ul>
			</section>
		</article>
	);
};

export default FAQ;
