import { AiOutlineShoppingCart } from "react-icons/ai";

const PaymentRefund = () => {
	return (
		<div>
			<div className='table-responsive'>
				<table className='table align-middle'>
					<thead>
						<tr>
							<th></th>
							<th></th>
							<th>Date</th>
							<th>Total Price</th>
							<th>Payment Type</th>
							<th></th>
							<th></th>
						</tr>
						{/* <tr>Date</tr> */}
					</thead>
					<tbody className='table-group-divider'>
						<tr>
							<td className='align-middle'>
								{/* <AiOutlineShoppingCart size={20} /> */}
							</td>
							<td
								className='align-middle'
								style={{ color: "#7b1fa2" }}
							>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Quos accusamus iste cum?
							</td>
							<td className='align-middle opacity-50'>
								Aug 3, 2022
							</td>
							<td className='align-middle opacity-50'>Rs. 0</td>
							<td className='align-middle opacity-50'>
								Free Coupon
							</td>
							<td className='align-middle'>
								<button className='btn main-btn m-2'>
									Receipt
								</button>
							</td>
						</tr>
						<tr>
							<td className='align-middle'>
								{/* <AiOutlineShoppingCart size={20} /> */}
							</td>
							<td
								className='align-middle'
								style={{ color: "#7b1fa2" }}
							>
								{" "}
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Eaque, perferendis.
							</td>
							<td className='align-middle opacity-50'>
								Sept 5, 2022
							</td>
							<td className='align-middle opacity-50'>Rs. 0</td>
							<td className='align-middle opacity-50'>
								Free Coupon
							</td>
							<td>
								{" "}
								<button className='btn main-btn m-2'>
									Receipt
								</button>
							</td>
						</tr>
						<tr>
							<td className='align-middle'>
								{/* <AiOutlineShoppingCart size={20} /> */}
							</td>
							<td
								className='align-middle'
								style={{ color: "#7b1fa2" }}
							>
								Lorem ipsum dolor s elit. Aperiam, architecto?
								Commodi sapiente error nihil ducimus.
							</td>
							<td className='align-middle opacity-50'>
								Dec 23, 2022
							</td>
							<td className='align-middle opacity-50'>Rs. 0</td>
							<td className='align-middle opacity-50'>
								Free Coupon
							</td>
							<td className='align-middle'>
								<button className='btn main-btn m-2'>
									Receipt
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PaymentRefund;
