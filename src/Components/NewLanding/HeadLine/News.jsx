import { useSelector } from "react-redux";
import parse from "html-react-parser";

const News = () => {
	const { newsData } = useSelector((state) => state.response);

	//style for news container
	const newsContainer = {
		height: "18rem",
		overflowY: "auto",
		padding: "0 1rem 0 0",
		textAlign: "justify",
	};

	return (
		<article className='col-md-6 col-12 p-0 m-0' id='news'>
			<section className='bg-light border border-2 rounded-1 p-2 p-md-3'>
				<h4 className='d-flex align-items-center fs-4'>
					News <span className='badge badge-text ml-3'>Latest</span>
				</h4>
				<hr />
				<div style={newsContainer}>
					{newsData.map(({ id, description }) => (
						<p key={id}>{parse(String(description))}</p>
					))}
				</div>
			</section>
		</article>
	);
};

export default News;
