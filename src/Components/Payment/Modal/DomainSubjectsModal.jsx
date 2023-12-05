import { BsCartCheckFill } from "react-icons/bs";

import PackInclusions from "../../../Pages/Payment/PackInclusions";

const DomainSubjectsModal = ({
	submitModal,
	packTemp,
	packInc,
	closeModal,
	boolaen,
	setBoolaen,
	title,
	packTitle,
	setPackTemp,
}) => {
	const disableCount = (subject) => {
		let countspecialInstruction = packTemp[0].avlDomainSubjects.filter(
			(sub) => sub.specialInstruction === true
		).length;
		let countselection = packTemp[0].avlDomainSubjects.filter(
			(sub) => sub.selection === true
		).length;
		if (subject.specialInstruction) {
			subject.specialInstruction = false;
			setBoolaen((prev) => ({ ...prev, disDomain: false }));
		} else {
			if (
				countspecialInstruction + countselection <
				packTemp[0].domainSubjMaxSelectCount
			) {
				subject.specialInstruction = true;
				setBoolaen((prev) => ({ ...prev, disDomain: false }));
			} else {
				subject.specialInstruction = false;
				setBoolaen((prev) => ({ ...prev, disDomain: true }));
			}
		}
	};

	const updatePack = (updateSub, obj) => {
		let updateArr = packTemp.map((pack) => {
			pack[obj] = updateSub;
			return pack;
		});
		setPackTemp(updateArr);
	};

	const handleDomainsub = (key) => {
		let currentSel = packTemp[0].avlDomainSubjects.map((sub, index) => {
			if (index === key) {
				disableCount(sub);
			}
			return sub;
		});
		updatePack(currentSel, "avlDomainSubjects");
		submitModal("avlDomainSubjects", "defaultDomainSubjCount");
	};

	let langsel = packTemp.length
		? packTemp[0].avlLangSubjects?.filter((x) => x.selection).length ===
		  packTemp[0].langSubjMaxSelectCount
			? true
			: false
		: false;

	const handleLang = (key) => {
		let currentSel = packTemp[0].avlLangSubjects.map((sub, index) => {
			if (index === key) {
				sub.specialInstruction
					? (sub.specialInstruction = false)
					: (sub.specialInstruction = true);
			} else {
				sub.specialInstruction = false;
				sub.selection = false;
			}
			return sub;
		});
		updatePack(currentSel, "avlLangSubjects");
		disableCount(packTemp);
		submitModal("avlLangSubjects", "defaultLangSubjCount");
	};

	//to clear all selected domain subjects
	const clearDomain = () => {
		let currentSel = packTemp[0].avlDomainSubjects.map((sub) => {
			sub.specialInstruction = false;
			return sub;
		});
		updatePack(currentSel, "avlDomainSubjects");
		setBoolaen((prev) => ({ ...prev, disDomain: false }));
	};

	return (
		<article
			className='modal fade'
			id='subModal'
			data-bs-backdrop='static'
			tabIndex='-1'
			role='dialog'
		>
			<section
				className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable'
				role='document'
			>
				<section className='modal-content'>
					<header className='modal-header modal-header-container'>
						<h5 className='modal-title'>
							{title} {packTitle && "-"} {packTitle}
						</h5>
						<button
							type='button'
							className='close'
							onClick={() => closeModal()}
							data-bs-dismiss='modal'
							aria-label='Close'
							style={{margin:"10px"}}
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</header>
					<main className='modal-body'>
						{packInc.length ? (
							<PackInclusions packInc={packInc} />
						) : (
							""
						)}
						{boolaen.showDomain && (
							<>
								<div
									className={
										boolaen.disDomain
											? "d-flex flex-wrap gap-2 disable"
											: "d-flex flex-wrap gap-2"
									}
								>
									{packTemp[0].avlDomainSubjects
										.sort(function (a, b) {
											if (a.topicName < b.topicName) {
												return -1;
											}
											if (a.topicName > b.topicName) {
												return 1;
											}
											return 0;
										})
										.map((sub, index) => {
											return (
												<button
													key={index}
													onClick={() =>
														handleDomainsub(index)
													}
													className={
														sub.specialInstruction
															? "domain_sub active"
															: "domain_sub"
													}
													disabled={
														sub.selection ||
														sub.disableAndMarked
													}
												>
													{sub.disableAndMarked && (
														<BsCartCheckFill />
													)}
													{sub.topicName}
												</button>
											);
										})}
								</div>
								<p className='warning_txt alertTxt mt-3 mb-0'>
									You can select at most{" "}
									{packTemp[0].domainSubjMaxSelectCount}{" "}
									subject(s). Please deselect any subject
									first to select the other one.{" "}
								</p>
								{boolaen.alertTxt && (
									<p className='alertTxt mt-3 mb-0'>
										Please select{" "}
										{packTemp[0].defaultDomainSubjCount}{" "}
										subject(s).
									</p>
								)}
							</>
						)}
						{boolaen.showLang && (
							<div className='d-flex flex-wrap flex_gap'>
								{packTemp[0].avlLangSubjects.map(
									(lang, index) => {
										return (
											<div
												className='form-check'
												key={index}
											>
												<input
													className='form-check-input'
													type='checkbox'
													name={lang.topicName}
													id={lang.topicId}
													value={lang.topicName}
													checked={
														lang.specialInstruction ||
														lang.selection
															? true
															: false
													}
													onClick={() =>
														handleLang(index)
													}
													disabled={
														langsel ? true : false
													}
												/>
												<label
													className='form-check-label'
													htmlFor={lang.topicId}
												>
													{lang.topicName}
												</label>
											</div>
										);
									}
								)}
							</div>
						)}
					</main>
					<footer className='modal-footer'>
						{packInc.length ? (
							<button
								type='button'
								onClick={closeModal}
								data-bs-dismiss='modal'
								className='btn main-btn'
							>
								OKAY, GOT IT!
							</button>
						) : (
							<>
								{boolaen.showDomain && (
									<button
										type='button'
										className='btn btn-secondary'
										onClick={clearDomain}
									>
										CLEAR ALL
									</button>
								)}
								<button
									type='button'
									className='btn main-btn'
									data-bs-dismiss={
										boolaen.modalValid ? "modal" : ""
									}
									onClick={
										boolaen.showDomain
											? () =>
													submitModal(
														"avlDomainSubjects",
														"defaultDomainSubjCount"
													)
											: () =>
													submitModal(
														"avlLangSubjects",
														"defaultLangSubjCount"
													)
									}
								>
									SUBMIT
								</button>
							</>
						)}
					</footer>
				</section>
			</section>
		</article>
	);
};

export default DomainSubjectsModal;
