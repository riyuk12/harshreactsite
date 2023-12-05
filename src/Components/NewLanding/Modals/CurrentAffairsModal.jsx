import parse from "html-react-parser";

const CurrentAffairsModal = ({ index, item }) => {
	return (
		<section
			className='modal fade'
			id={`currentAffairs${index}`}
			tabIndex='-1'
			aria-labelledby={`#currentAffairs${index}Label`}
			aria-hidden='true'
		>
			<div className='modal-dialog modal-lg modal-dialog-scrollable'>
				<article className='modal-content'>
					<header className='modal-header modal-header-container'>
						<h5
							className='modal-title'
							id={`currentAffairs${index}Label`}
						>
							Current Affairs from{" "}
							<span>{parse(String(item.dateRangeText))}</span>
							{console.log("item")}
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</header>
					<main className='modal-body'>
						<div
							className='d-flex text-center gap-4 justify-content-center'
							style={{ flexWrap: "wrap" }}
						>
							{item?.affairsBeans?.map(
								(
									{
										currentAffairsHead,
										currentAffairsContent,
									},
									index
								) => (
									<section
										key={index}
										className='card border'
									>
										<h6 className='main-color fw-bold mb-4'>
											{parse(String(currentAffairsHead))}
										</h6>
										<p className='text-justify'>
											{parse(
												String(currentAffairsContent)
											)}
										</p>
									</section>
								)
							)}
						</div>
					</main>
				</article>
			</div>
		</section>
	);
};

export default CurrentAffairsModal;
