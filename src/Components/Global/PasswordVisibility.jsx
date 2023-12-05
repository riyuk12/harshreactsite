import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordVisibility = ({ isPasswordVisible, setIsPasswordVisible }) => {
	return (
		<span className='password-icon'>
			{!isPasswordVisible ? (
				<AiFillEyeInvisible
					onClick={(e) => {
						setIsPasswordVisible(true);
					}}
				/>
			) : (
				<AiFillEye
					onClick={(e) => {
						setIsPasswordVisible(false);
					}}
				/>
			)}
		</span>
	);
};

export default PasswordVisibility;
