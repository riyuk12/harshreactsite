import parse from "html-react-parser";
import React from "react";

const PackInclusions = ({ packInc }) => {
	return (
		<div className='pack_inclusion bg-white border-white p-0 m-0'>
			<ul>
				{packInc.map((pack) => (
					<li>
						<span>{parse(String(pack))}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PackInclusions;
