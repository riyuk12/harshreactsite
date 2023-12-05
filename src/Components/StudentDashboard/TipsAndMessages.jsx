import parse from "html-react-parser";
import { useSelector } from "react-redux";
import TipsAndMessagesSkeleton from "./Skeletons/TipsAndMessagesSkeleton";

const TipsAndMessages = () => {
	const { tip, message, isLoading } = useSelector((state) => state.response);

	if (isLoading.newsMessageLoading) {
		return <TipsAndMessagesSkeleton />;
	}

	return (
		<section
			className='bg-white rounded-2 d-flex align-items-center flex-fill message p-2'
			style={{ maxHeight: "150px", minHeight: "150px" }}
		>
			<article
				id='carouselExampleIndicators'
				className='carousel slide d-flex justify-content-center align-items-center'
				data-bs-ride='carousel'
				style={{ minHeight: "100px" }}
			>
				<section className='carousel-inner'>
					<div className='carousel-item active'>
						<div className='p-1 d-flex flex-column align-items-center'>
							<h5 className='animate-charcter1 fw-bold m-0'>
								Message :
							</h5>
							{message?.map(({ description, id }) => {
								return (
									<p
										key={id}
										className='charcter m-0 text-center'
										style={{
											textTransform: "capitalize",
										}}
									>
										{parse(String(description))}
									</p>
								);
							})}
						</div>
					</div>
					<div className='carousel-item '>
						<div className='p-1 d-flex flex-column align-items-center'>
							<h5 className='animate-charcter1 fw-bold m-0'>
								Tip of the day :
							</h5>
							<p
								className='charcter m-0 text-center'
								style={{
									textTransform: "capitalize",
								}}
							>
								{parse(String(tip))}
							</p>
						</div>
					</div>
				</section>
				<section className='carousel-indicators d-flex justify-content-center'>
					<button
						type='button '
						data-bs-target='#carouselExampleIndicators'
						data-bs-slide-to='0'
						className='active '
						aria-current='true'
						aria-label='Slide 1'
						tabIndex={-1}
						style={{
							borderRadius: "50%",
							height: "10px",
							width: "10px",
							backgroundColor: "#7B1FA2",
						}}
					></button>
					<button
						style={{
							borderRadius: "50%",
							height: "10px",
							width: "10px",
							backgroundColor: "#7B1FA2",
						}}
						type='button'
						data-bs-target='#carouselExampleIndicators'
						data-bs-slide-to='1'
						aria-label='Slide 2'
						tabIndex={-1}
					></button>
				</section>
			</article>
		</section>
	);
};

export default TipsAndMessages;
