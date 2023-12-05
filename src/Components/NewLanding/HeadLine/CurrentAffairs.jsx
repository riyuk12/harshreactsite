import { Fragment } from "react";
import { useSelector } from "react-redux";

import CurrentAffairsModal from "../Modals/CurrentAffairsModal";

const CurrentAffairs = () => {
	const { currentAffairsData } = useSelector((state) => state.response);

	return (
		<article className='col-md-6 col-12 p-0 m-0' id='current-affairs'>
			<section className='bg-light border border-2 rounded-1 p-2 p-md-3'>
				<h4 className='d-flex align-items-center fs-4'>
					Current Affairs
					<span className='badge ml-3 badge-text'>Latest</span>
				</h4>
				<hr />
				<article style={{ height: "18rem", overflowY: "auto" }}>
					{currentAffairsData?.map((item, index) => (
						<Fragment key={index}>
							<section
								className='main-color fw-bolder current-affair-headings'
								data-bs-toggle='modal'
								data-bs-target={`#currentAffairs${index}`}
							>
								{item.dateRangeText}
							</section>
							<CurrentAffairsModal index={index} item={item} />
						</Fragment>
					))}
				</article>
			</section>
		</article>
	);
};

export default CurrentAffairs;
