import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import baseUrl from "../../baseUrl";

export default function Address({
	profileData,
	updateBillingDetails,
	setUpdateBillingDetails,
	stateList,
}) {
	const [selectEvent, setSelectEvent] = useState(false);
	const [addNewAddress, setAddNewAddress] = useState(false);
	const [cityList, setCityList] = useState([]);

	useEffect(() => {
		if (updateBillingDetails?.stateCode) {
			axios
				.get(
					baseUrl() +
						"/df/getDistrictsForState/" +
						updateBillingDetails?.stateCode,
					{
						headers: {
							"Access-Control-Allow-Origin": "*",
							Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
							Authorization: `${Cookies.get("token")}`,
						},
					}
				)
				.then((res) => res.data)
				.then((data) => {
					setCityList(data.Data);
				});
		}
	}, [updateBillingDetails?.stateCode]);

	//handles the change of radio button
	const handleAddressChange = (e) => {
		if (e.target.id === "profile-addr") {
			setUpdateBillingDetails({
				...updateBillingDetails,
				stateName: profileData.state,
				stateCode: profileData?.stateCode,
				address: profileData.address,
				city: profileData.city,
				pincode: profileData.pincode,
			});
			setAddNewAddress(false);
		} else {
			setUpdateBillingDetails({
				...updateBillingDetails,
				stateName: "",
				stateCode: "",
				address: "",
				city: "",
				pincode: "",
			});
			setAddNewAddress(true);
		}
	};

	// habdles change in the input fields for new address
	const onHandleChange = (e) => {
		const { name, value } = e.target;
		setUpdateBillingDetails((prevBillingDetails) => ({
			...prevBillingDetails,
			[name]: value,
		}));

		if (e.target.name === "city") {
			setSelectEvent(true);
		} else {
			setSelectEvent(false);
		}
	};

	return (
		<>
			{profileData.address && (
				<>
					<input
						type='radio'
						id='profile-addr'
						onChange={handleAddressChange}
						checked={!addNewAddress}
						style={{ maxWidth: "max-content", marginRight: "5px" }}
					/>
					<label htmlFor='profile-addr'>
						Your billing address will be:
					</label>
					<address className='ms-4 address-container'>
						<span className='address-line'>
							Address: <b>{profileData?.address || ""}</b>
						</span>
						<span className='address-line'>
							District: <b>{profileData?.city || ""}</b>
						</span>
						<span className='address-line'>
							State: <b>{profileData?.state || ""}</b>
						</span>
						<span className='address-line'>
							Pincode: <b>{profileData?.pincode || ""}</b>
						</span>
					</address>
					<hr />
				</>
			)}
			<section>
				<input
					type='radio'
					id='newAddress'
					onChange={handleAddressChange}
					checked={addNewAddress}
					style={{ maxWidth: "max-content", marginRight: "5px" }}
				/>
				<label htmlFor='newAddress' className='mt-2'>
					Add a New Address
				</label>

				{addNewAddress && (
					<>
						<article className='d-flex flex-column gap-2 align-items-start justify-content-between mt-3'>
							<h5>Billing Address</h5>
							<div className='w-100'>
								<label
									htmlFor='address'
									className='modal-profile-label'
								>
									Address
								</label>
								<textarea
									type='text'
									rows='4'
									placeholder='Address'
									className='modal-profile-fields'
									id='address'
									name='address'
									value={updateBillingDetails?.address}
									onChange={onHandleChange}
								/>
							</div>

							<div className='w-100'>
								<label
									htmlFor='state'
									className='modal-profile-label'
								>
									State
								</label>
								<select
									className='modal-profile-fields'
									aria-label='Default select example'
									value={updateBillingDetails.stateName}
									style={{ width: "100%", padding: 10 }}
									onChange={(event) => {
										let val = stateList.filter(
											(e) =>
												e.stateName ===
												event.target.value
										);
										setUpdateBillingDetails((prev) => ({
											...prev,
											stateName: event.target.value,
											stateCode: val[0].stateCode,
										}));
									}}
								>
									<option
										style={
											updateBillingDetails.stateName ===
												null ||
											updateBillingDetails.stateName ===
												""
												? { display: "inline-block" }
												: { display: "none" }
										}
										value='null'
									>
										SELECT THE STATE
									</option>
									{stateList.length > 0
										? stateList.map((item, index) => (
												<option
													key={index}
													value={item.stateName}
												>
													{item.stateName}
												</option>
										  ))
										: ""}
								</select>
							</div>

							<div className='position-relative w-100'>
								<label
									htmlFor='dist'
									className='modal-profile-label'
								>
									District
								</label>
								<input
									type='text'
									autoComplete='off'
									id='dist'
									className='modal-profile-fields'
									value={updateBillingDetails?.city || ""}
									name='city'
									onChange={onHandleChange}
									placeholder='District'
								/>
								<div
									className='position-absolute bg-light'
									style={
										selectEvent && updateBillingDetails.city
											? {
													maxHeight: "120px",
													width: "100%",
													overflow: "auto",
													zIndex: "999",
											  }
											: { display: "none" }
									}
								>
									{cityList
										.filter(
											({ districtName }) =>
												districtName.indexOf(
													updateBillingDetails.city.toUpperCase()
												) > -1
										)
										.map((city, index) => (
											<option
												key={index}
												value={city.districtName}
												onClick={(e) => {
													setUpdateBillingDetails(
														(prev) => ({
															...prev,
															city: e.target
																.value,
														})
													);
													setSelectEvent(false);
												}}
												className='border p-2 bg-light'
											>
												{city.districtName}
											</option>
										))}
								</div>
							</div>

							<div className='w-100'>
								<label
									htmlFor='pincode'
									className='modal-profile-label'
								>
									Pincode
								</label>
								<input
									type='number'
									className='modal-profile-fields'
									placeholder='pincode'
									value={updateBillingDetails?.pincode || ""}
									onChange={onHandleChange}
									name='pincode'
								/>
							</div>
						</article>
					</>
				)}
			</section>
		</>
	);
}

//removed from handleAddressChange 2nd condition

//  else if (e.target.id === "bill-addr") {
// 			setUpdateBillingDetails((prev) => ({
// 				...prev,
// 				stateName: billingDetails.stateName,
// 				stateCode: billingDetails.stateCode,
// 				address: billingDetails.address,
// 				city: billingDetails.city,
// 				pincode: billingDetails.pincode,
// 			}));
// 			setAddNewAddress(false);
// 		}

//don't know if its usefull
// const [addNewGst, setAddNewGst] = useState(false);

// const onHandleGst = () => {
// 	addNewGst ? setAddNewGst(false) : setAddNewGst(true);
// };

// {
// 	/* <input
//         type="checkbox"
//         id="GstNum"
//         name="update"
//         style={{ width: "25px" }}
//         onClick={onHandleGst}
//       />
//       <label htmlFor="GstNum" className="mt-2">
//         Gst number:
//       </label>
//       {addNewGst ? (
//         <input
//           type="text"
//           placeholder="gst Number"
//           value={updateBillingDetails?.gstNo || ""}
//           onChange={(e) =>
//             setUpdateBillingDetails((prevBillingDetails) => ({
//               ...prevBillingDetails,
//               gstNo: e.target.value,
//             }))
//           }
//           name="gstNo"
//         />
//       ) : (
//         ""
//       )} */
// }
