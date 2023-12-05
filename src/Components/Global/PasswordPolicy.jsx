import { AiFillQuestionCircle } from "react-icons/ai";

const PasswordPolicy = () => {
	return (
		<section className='password-policy-tooltip absolute'>
			<span className='question-icon'>
				<AiFillQuestionCircle className='password-policy-tooltip-icon' />
			</span>
			<section className='password-policy-tooltip-container'>
				<p>Suggestion for Strong Password:</p>
				<ul>
					<li>Minimum of 10 characters in length.</li>
					<li>
						Must contain at least a number(0-9), a UPPERCASE (A-Z),
						a lowercase character (a-z) and Special Charater (such
						as !@#$%^&).
					</li>
					<li>
						Must not contain personal information or common words.
					</li>
				</ul>
			</section>
		</section>
	);
};

export default PasswordPolicy;
