import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostDownloadMaterialThunk } from "../../../Redux/Thunks/Post/PostDownloadMaterialThunk";
import Cookies from "js-cookie";
import axios from "axios";
// import FolderClosed from "../../../Assets/images/folder_closed.png";
import DownloadIcon from "../../../Assets/images/Download.png";
import $ from 'jquery';
import parse from "html-react-parser";
import baseUrl from "../../baseUrl";

var downloadDown = false;


$(document).on("click", "ul.treeRoot li.tree span.tree_span", function(){
	console.log("coming")
	console.log($(this).parent().hasClass("hasSubMenu"))
	if($(this).parent().hasClass("hasSubMenu")){
		if($(this).parent().find("ul").hasClass("activeSubMenu")){
				$(this).parent().find("ul").removeClass("activeSubMenu");
				$(this).removeClass("hasChild");
				$(this).parent().removeClass("opened");
				// $(this).parent().children().find("ul").removeClass("opened")
				var totalSub = $(this).parent().find("ul");
				for(let i=0; i < totalSub.length; i++){
					console.log("totalSub",totalSub.eq(0).find("li"))
					if(i > 0){
						totalSub.eq(i).find("li").removeClass("opened");
					}
				}
				console.log("parent", );
		}
		else
		{
			console.log("coming 2")
			$(this).parent().find("ul").eq(0).addClass("activeSubMenu");	
			$(this).addClass("hasChild");
			$(this).parent().addClass("opened");
		}


		
	}	
});

/* $(document).on("click", ".btn-download ", function(){
	var fileName = $(this).attr("data-fileName");
	alert(fileName);
	window.open(
		// https://besst.in/besstMainApi/df/downloadStudyFile/
		`${baseUrl()}/df/downloadStudyFile/${fileName}`,
		"_blank"
	);
}); */

const DownloadMaterial = (props) => {

	


	const dispatch = useDispatch();
	const { downloadMaterial } = useSelector((state) => state.postResp);
	const { courses } = useSelector((state) => state.response);
	const preferredCourse = localStorage.getItem("preferredCourse");
	var PreferredCsId = localStorage.getItem("preferredCourseId");//props.preferredCourseId;//Cookies.get("preferredCourseId");

	useEffect(() => {
		const preferedCourseId = courses?.find(
			(item) => item.courseName === preferredCourse
		)?.courseId;

		dispatch(
			PostDownloadMaterialThunk({
				token: Cookies.get("token"),
				data: { courseId: preferedCourseId },
			})
		);
		
		
	}, [preferredCourse]);

	const handleDownload = (id) => {
		window.open(
			`${baseUrl()}/df/downloadFile/${id}`,
			"_blank"
		);
	};

	// download material api integation

	const [materialDownload, setMaterialDownload] = useState([]);
	var [downloadUI, setDownloadUI] = useState("");
	var inc = 0;

	const newGetmatirialApi = async (id) => {
		// const response = await axios.get(`${baseUrl()}/df/studyMaterial/${PreferredCsId}`);
		const response = await axios.get(`${baseUrl()}/df/studyMaterial/${id}`);
		setMaterialDownload(response.data);
		console.log(response.data);
		var UlLi = "";


		UlLi += `<ul className="activeSubMenu treeRoot tree">
					`;
		
		UlLi += await generateFolderStructure(response.data, inc+1);
		UlLi += `</li>
			</ul> `;
		setDownloadUI(UlLi)
		// console.log("success")

	};


	const generateFolderStructure = async (item) =>{
		console.log("item", typeof item, item.length, item)
		var UlLi = ``;
		if(item?.folderName){
			UlLi += `<li className="hasSubMenu  tree"> 
			<span className="tree_span">
				<span className="bgImg"></span> `+ item?.folderName +`
			</span> 
			<span className="bgImgArrow"></span><hr>`;
			UlLi +=`<ul className="tree root_child">`
			if(item?.subFolders.length > 0)
			{
				
				UlLi += await generateFolderStructure(item.subFolders, inc+1);
				
				
			}

			if(item.files.length > 0){
				for(let j=0; j < item.files.length; j++){
					UlLi += `<li className="tree"><a  className='file_span' href='${baseUrl()}/df/downloadStudyFile/${item.files[j].id}' target='_blank'> <span data-fileName='`+item.files[j].id+`' className="">`+item.files[j].fileName+`</span> <button data-fileName='`+item.files[j].id+`'
					className='btn btn-download'
				>
					<img src='`+DownloadIcon+`' />
				</button></a></li>`
				}
				
			}
			UlLi +=`</ul>`;
			
			UlLi += `</li>`;
		}
		else if(item.length > 0)
		{
			for(let i=0; i<item.length; i++){
				UlLi += `<li className="hasSubMenu  tree"> 
							<span className="tree_span">
								<span className="bgImg"></span> `+ item[i].folderName +`
							</span> 
							<span className="bgImgArrow"></span>`;
				UlLi +=`<ul className="tree root_child">`
				if(item[i].subFolders.length > 0)
				{
					console.log("FILESS", item[i].files)
					
					UlLi += await generateFolderStructure(item[i].subFolders, inc+1);
				}

				if(item[i].files.length > 0){
					console.log("filess", item[i].files)
					for(let j=0; j < item[i].files.length; j++){
						UlLi += `<li className="tree"><a className='file_span' href='${baseUrl()}/df/downloadStudyFile/${item[i].files[j].id}' target='_blank'><span data-fileName='`+item[i].files[j].id+`' className=" ">`+item[i].files[j].fileName+`</span> <button  data-fileName='`+item[i].files[j].id+`'
						className='btn btn-download'
					>
						<img src='`+DownloadIcon+`' />
					</button></a></li>`
					}
				}
				UlLi +=`</ul>`;

				UlLi += `</li>`
			}
			
		}

		return UlLi;
	}

	

	useEffect(() => {
		// newGetmatirialApi();

		console.log("preferredCourseId", PreferredCsId)
		if(PreferredCsId){
			var folderId = (PreferredCsId == 1) ? 10  : (PreferredCsId == 4) ? 9 : (PreferredCsId == 6) ? 1 : PreferredCsId;
			newGetmatirialApi(folderId);
		}
		
	},[]);

	// if(PreferredCsId){
	// 	if(downloadDown == false){
	// 		var folderId = (PreferredCsId == 1) ? 10  : (PreferredCsId == 4) ? 9 : (PreferredCsId == 6) ? 1 : PreferredCsId;
	// 		newGetmatirialApi(folderId);
	// 	}

	// 	downloadDown = true;
		
	// }




	return (
		<article
			className='modal fade'
			id='downloadModal'
			tabIndex='-1'
			aria-labelledby='takenModalLabel'
			aria-hidden='true'
			style={{ width: "100%" }}
		>
			<section className='modal-dialog modal-dialog-scrollable downloadModal'>
				<section className='modal-content'>
					<header className='modal-header modal-header-container'>
						<h5
							className='modal-title main-color'
							id='takenModalLabel'
						>
							Download Material
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</header>
					<main className='modal-body d-flex flex-column gap-2'>
						{parse(downloadUI)}
						{downloadMaterial.length > 0 ? (
							downloadMaterial.map((downloadItem) => (
								<>
								</>
								// <div
								// 	key={downloadItem.topicId}
								// 	className='download-material-container'
								// >
								// 	<div className='download-material-details'>
								// 		<h5 className='m-0 download-topic-name'>
								// 			{downloadItem.topicName}
								// 		</h5>
								// 		<p className='m-0 download-doc-name'>
								// 			{downloadItem.remarks}
								// 		</p>
								// 	</div>

								// 	<button
								// 		className='btn main-btn'
								// 		onClick={() =>
								// 			handleDownload(
								// 				downloadItem.documentName
								// 			)
								// 		}
								// 	>
								// 		Download
								// 	</button>
								// </div>
							))
						) : (
							// <p className='fallback-message'>
							// 	No material available yet!
							// </p>
							<>
								{/* search bar */}



								{/* <div class="container">
									<div className="search-menu">
										<input className="search-btn" type="search" placeholder="Search..." />
										<button className="search-submit" type="submit">Search</button>
									</div>
								</div>
								<div className="sort_menu">
									<button className="sort-btn" type="button">sort</button>
								</div> */}
								
								 

								{/* <div class="accordion" id="accordionExample">
									<div class="accordion-item">
										<h2 class="accordion-header " id="headingOne">
											<button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
												<i class="fa fa-folder-open p-1 fa-folder"></i>
												<span className="accor-head">AGRICULTURE</span>
											</button>
										</h2>
										<div id="collapseOne" class="accordion-collapse collapse show col-md-8" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
											<div class="accordion-body">
												<div class="accordion" id="sub-accordionExample">
													<div class="accordion-item">
														<h2 class="accordion-header" id="sub-headingOne">
															<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseOne" aria-expanded="false" aria-controls="collapseOne">
																<i class="fa fa-folder-open p-1 fa-folder"></i>
																<span className="accordion-sub-head">CUET Sample Paper</span>
															</button>
														</h2>
														<div id="sub-collapseOne" class="accordion-collapse collapse show" aria-labelledby="sub-headingOne" data-bs-parent="#sub-accordionExample">
															<div class="accordion-body">
																<div class="tree">
																	<ul>
																		<li>
																			<span className="accordion-sub-head-one">{materialDownload?.folderName}
																				CUET Sample Paper_01
																				<i class="fa fa-arrow-down p-1 mx-2 fa-arrow-down"></i>
																				<span className="fa folder"></span>
																			</span>

																		</li>
																		<li>
																			<span className="accordion-sub-head-one"> CUET Sample Paper_02</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div> */}

								{/* <div class="accordion" id="accordionExample">
									<div class="accordion-item">
										<h2 class="accordion-header" id="headingTwo">
											<button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
												<i class="fa fa-folder-open p-1 "></i>
												<span className="accor-head">ANTHROPOLOGY</span>
											</button>
										</h2>
										<div id="collapseTwo" class="accordion-collapse collapse show col-md-8" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
											<div class="accordion-body">
												<div class="accordion" id="sub-accordionExample">
													<div class="accordion-item">
														<h2 class="accordion-header" id="sub-headingTwo">
															<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
																<i class="fa fa-folder-open p-1"></i>
																<span className="accordion-sub-head">CUET Sample Paper</span>
															</button>
														</h2>
														<div id="sub-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="sub-headingTwo" data-bs-parent="#sub-accordionExample">
															<div class="accordion-body">
																<div class="tree">
																	<ul>
																		<li> <span className="accordion-sub-head-one">CUET Sample Paper_01</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																		<li> <span className="accordion-sub-head-one"> CUET Sample Paper_02</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="accordion" id="accordionExample">
									<div class="accordion-item">
										<h2 class="accordion-header" id="headingThree">
											<button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
												<i class="fa fa-folder-open p-1 "></i>
												<span className="accor-head">ASSAMESE</span>
											</button>
										</h2>
										<div id="collapseThree" class="accordion-collapse collapse show col-md-8" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
											<div class="accordion-body">
												<div class="accordion" id="sub-accordionExample">
													<div class="accordion-item">
														<h2 class="accordion-header" id="sub-headingThree">
															<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseThree" aria-expanded="false" aria-controls="collapseThree">
																<i class="fa fa-folder-open p-1"></i> 		<span className="accordion-sub-head">CUET Sample Paper</span>
															</button>
														</h2>
														<div id="sub-collapseThree" class="accordion-collapse collapse show" aria-labelledby="sub-collapseThree" data-bs-parent="#sub-accordionExample">
															<div class="accordion-body">
																<div class="tree">
																	<ul>
																		<li> <span className="accordion-sub-head-one">CUET Sample Paper_01</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																		<li> <span className="accordion-sub-head-one"> CUET Sample Paper_02</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="accordion" id="accordionExample">
									<div class="accordion-item">
										<h2 class="accordion-header" id="headingFour">
											<button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
												<i class="fa fa-folder-open p-1 "></i>
												<span className="accor-head">BIOLOGY</span>
											</button>
										</h2>
										<div id="collapseFour" class="accordion-collapse collapse show col-md-8" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
											<div class="accordion-body">
												<div class="accordion" id="sub-accordionExample">
													<div class="accordion-item">
														<h2 class="accordion-header" id="sub-headingFour">
															<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseFour" aria-expanded="false" aria-controls="collapseFour">
																<i class="fa fa-folder-open p-1"></i>
																<span className="accordion-sub-head">CUET Sample Paper</span>
															</button>
														</h2>
														<div id="sub-collapseFour" class="accordion-collapse collapse show" aria-labelledby="sub-headingFour" data-bs-parent="#sub-accordionExample">
															<div class="accordion-body">
																<div class="tree">
																	<ul>
																		<li> <span className="accordion-sub-head-one">CUET Sample Paper_01</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																		<li> <span className="accordion-sub-head-one"> CUET Sample Paper_02</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="accordion" id="accordionExample">
									<div class="accordion-item">
										<h2 class="accordion-header" id="headingFive">
											<button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
												<i class="fa fa-folder-open p-1 "></i>
												<span className="accor-head">BUSINESS STUDIES</span>
											</button>
										</h2>
										<div id="collapseFive" class="accordion-collapse collapse show col-md-8" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
											<div class="accordion-body">
												<div class="accordion" id="sub-accordionExample">
													<div class="accordion-item">
														<h2 class="accordion-header" id="sub-headingFive">
															<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseFive" aria-expanded="false" aria-controls="collapseFive">
																<i class="fa fa-folder-open p-1"></i>
																<span className="accordion-sub-head">CUET Sample Paper</span>
															</button>
														</h2>
														<div id="sub-collapseFive" class="accordion-collapse collapse show" aria-labelledby="sub-headingFive" data-bs-parent="#sub-accordionExample">
															<div class="accordion-body">
																<div class="tree">
																	<ul>
																		<li> <span className="accordion-sub-head-one">CUET Sample Paper_01</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																		<li> <span className="accordion-sub-head-one"> CUET Sample Paper_02</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="accordion" id="accordionExample">
									<div class="accordion-item">
										<h2 class="accordion-header" id="headingSix">
											<button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
												<i class="fa fa-folder-open p-1 "></i>
												<span className="accor-head">CHEMISTRY</span>
											</button>
										</h2>
										<div id="collapseSix" class="accordion-collapse collapse show col-md-8" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
											<div class="accordion-body">
												<div class="accordion" id="sub-accordionExample">
													<div class="accordion-item">
														<h2 class="accordion-header" id="sub-headingSix">
															<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseSix" aria-expanded="false" aria-controls="collapseSix">
																<i class="fa fa-folder-open p-1"></i>
																<span className="accordion-sub-head">CUET Sample Paper</span>
															</button>
														</h2>
														<div id="sub-collapseSix" class="accordion-collapse collapse show" aria-labelledby="sub-headingSix" data-bs-parent="#sub-accordionExample">
															<div class="accordion-body">
																<div class="tree">
																	<ul>
																		<li> <span className="accordion-sub-head-one">CUET Sample Paper_01</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																		<li> <span className="accordion-sub-head-one"> CUET Sample Paper_02</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="accordion" id="accordionExample">
									<div class="accordion-item">
										<h2 class="accordion-header" id="headingSeven">
											<button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
												<i class="fa fa-folder-open p-1 "></i>
												<span className="accor-head">ACCOUNTANCY</span>
											</button>
										</h2>
										<div id="collapseSeven" class="accordion-collapse collapse show col-md-8" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
											<div class="accordion-body">
												<div class="accordion" id="sub-accordionExample">
													<div class="accordion-item">
														<h2 class="accordion-header" id="sub-headingSeven">
															<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
																<i class="fa fa-folder-open p-1"></i>
																<span className="accordion-sub-head">CUET Sample Paper</span>
															</button>
														</h2>
														<div id="sub-collapseSeven" class="accordion-collapse collapse show" aria-labelledby="sub-headingSeven" data-bs-parent="#sub-accordionExample">
															<div class="accordion-body">
																<div class="tree">
																	<ul>
																		<li> <span className="accordion-sub-head-one">CUET Sample Paper_01</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																		<li> <span className="accordion-sub-head-one"> CUET Sample Paper_02</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="accordion" id="accordionExample">
									<div class="accordion-item">
										<h2 class="accordion-header" id="headingEignt">
											<button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
												<i class="fa fa-folder-open p-1 "></i>
												<span className="accor-head">BUSINESS STUDIES</span>
											</button>
										</h2>
										<div id="collapseEight" class="accordion-collapse collapse show col-md-8" aria-labelledby="headingEignt" data-bs-parent="#accordionExample">
											<div class="accordion-body">
												<div class="accordion" id="sub-accordionExample">
													<div class="accordion-item">
														<h2 class="accordion-header" id="sub-headingEignt">
															<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseEight" aria-expanded="false" aria-controls="collapseEight">
																<i class="fa fa-folder-open p-1"></i>
																<span className="accordion-sub-head">CUET Sample Paper</span>
															</button>
														</h2>
														<div id="sub-collapseEight" class="accordion-collapse collapse show" aria-labelledby="sub-headingEignt" data-bs-parent="#sub-accordionExample">
															<div class="accordion-body">
																<div class="tree">
																	<ul>
																		<li> <span className="accordion-sub-head-one">CUET Sample Paper_01</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																		<li> <span className="accordion-sub-head-one"> CUET Sample Paper_02</span>
																			<i class="fa-regular fa-arrow-down-to-bracket p-1"></i>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>   */}


							</>

						)}
					</main>
				</section>
			</section >
		</article >
	);
};

export default DownloadMaterial;
