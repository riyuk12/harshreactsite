import { useState } from "react";

function ConfirmEmailModal({ verifyEmail, CurrentEmail, onSendOtp }) {
	const [email, setEmail] = useState(CurrentEmail);
	return (
		<>
			{true ? (
				<div className='register-form-only'>
					<input
						style={{ width: "100%" }}
						id='email'
						required
						type='email'
						value={email}
						className='form-control'
						placeholder='Email*'
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>{" "}
					<p
						onClick={() => {}}
						style={{
							cursor: "pointer",
							marginRight: "auto",
						}}
					></p>
					{false ? (
						"Please Wait...."
					) : (
						<p
							className='btn main-btn'
							onClick={() => onSendOtp("1")}
						>
							Verify
						</p>
					)}
				</div>
			) : (
				""
			)}
		</>
	);
}

export default ConfirmEmailModal;
