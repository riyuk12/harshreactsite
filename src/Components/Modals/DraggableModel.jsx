import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Close from "../../Assets/images/Close.png";
import baseUrl from "../../Components/baseUrl";
import Draggable from 'react-draggable';
import { forEach } from 'lodash';
import { classNames } from '@react-pdf-viewer/core';



const DraggableModel = () => {

  const [email, setEmail] = React.useState('');
  const[promoDispaly, setpromoDispaly] = React.useState('none');
  const[promopopupDisplay, setpromopopupDisplay] = React.useState('none');
  const [promocode, setPromocode] = React.useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isHide, setIsHide] = useState("block");
  const [PopupHeight, setPopupHeight] = useState("200px");
  var cuetPromoFlag = Cookies.get("cuetPromoFlag");
  const [show, setShow] = useState(true);
  const [PromoMessages, setPromoMessages] = React.useState([]);
  var hideclass = show ? "custom-animation show" : "custom-animation hide";
  const[DisplayText1, setDisplayText1] = React.useState('');
  const[DisplayText2, setDisplayText2] = React.useState('');
  const [submit_disable,setSubmit_disable] = useState(false);
  var CurrentIteration = 0;

  const findAllActivePromos = async () => {
    let result = await fetch(baseUrl() + "/df/findAllActivePromos", {
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.log(result);

    for (let x in result.result) {

      PromoMessages.push( { "tex1" : result.result[x].displayText1, "tex2" : result.result[x].displayText2 })
    }
    setItems();
  }

  
  const handlelogin = async () => {
    setSubmit_disable(true)

    let result = await fetch(baseUrl() + "/df/validatePromoCode", {
      method:'post',
      body: JSON.stringify({ "email" : email, "promocode" : promocode }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    setSubmit_disable(false)
    console.warn(result)
    if(result.ResultCode != 200) {
      Swal.fire({
        icon: "error",
        title: result.ResultMessage,
        toast: true,
        position: "bottom-right",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      // document.getElementById("error-popup").innerHTML = result.data.error;
      
    }
    else{
      // toggleShow();
      Swal.fire({
        icon: "success",
        title: result.ResultMessage,
        toast: true,
        position: "bottom-right",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      
      localStorage.setItem('promoapplied', true);
    
      
      console.log(cuetPromoFlag)

      if (cuetPromoFlag === undefined || cuetPromoFlag == "")  {
        // alert('succes')
        document.getElementById("card_body").innerHTML='<button class="btn main-btn-outline px-4 py-2" type="button" id="particular-signup" data-bs-toggle="modal" data-bs-target="#registerationModal" style="margin-right:5px; width: 27%;font-size:10px;padding: 2px 2px 2px 2px  !important; ">Sign up</button><button class="btn main-btn-outline main-btn px-4 py-2" type="button" style="width: 27%;font-size:10px;padding: 2px 2px 2px 2px !important;    " id="particular-login" data-bs-toggle="modal" data-bs-target="#login">Sign In</button>';

        document.getElementById("promo_succes").innerHTML= ' <span class="con-msg">Congratulations !!!!</span> <br><span class="con-msg2">You have successfully redeemed your promo code.</span>  <br><span class="con-msg3">Now you may proceed to avail the benefits.</span> ';

       

        document.getElementById("mydivheader").innerHTML = "";
        // setPopupHeight("200px");

        setDisplayText1("");
        setDisplayText2("");
       
      }
      else{

        document.getElementById("card_body").innerHTML='';

        document.getElementById("promo_succes").innerHTML= ' <span class="con-msg">Congratulations !!!!</span> <br><span class="con-msg2">You have successfully redeemed your Promo Code To avail the benefits</span> ';

        
        document.getElementById("mydivheader").innerHTML = "";
        setPopupHeight("125px");

        setDisplayText1("");
        setDisplayText2("");
        
        /* toggleShow();
        setShow(!show); */
      }
    }
  }
  
  function toggleShow() {
    setShow(!show);
    if(!show){
      setpromoDispaly("none");
      
    }
    else{
      setpromoDispaly("block");
    }
    
  }

 

  function hidePopup(){
    console.log("hidePopup")
    hideclass = "custom-animation hide custom-animation-visible";
    setpromoDispaly("block");
  }

  function setItems(){
    var tex1 = PromoMessages[CurrentIteration].tex1.replace("<p><b>", "").replace("</b></p>", "");

    var tex2 = PromoMessages[CurrentIteration].tex2.replace("<p>", "").replace("</p>", "");

    setDisplayText1(tex1);
    setDisplayText2(tex2);
    CurrentIteration++;
  }


  

  useEffect(() => {

    findAllActivePromos();
    if(typeof cuetPromoFlag !== "undefined" && cuetPromoFlag == 0){
      console.log("popup 162", cuetPromoFlag)
      setpromopopupDisplay("block");
      setEmail(Cookies.get('email'));
      setIsDisabled(true);
      setIsHide("none");
      setPopupHeight("185px")
     
      
    }
    else if(typeof cuetPromoFlag == "undefined" || cuetPromoFlag == "")
    {
      console.log("popup 172", cuetPromoFlag)
      setTimeout(function(){
        setpromopopupDisplay("block");
        document.getElementById("mydiv").classList.add("custom-animation-visible")

        
        setInterval(() => {
          if(CurrentIteration >= PromoMessages.length){
            CurrentIteration = 0;
          }
          else{
            setItems();
          }
          
          
        }, 10000)
       },3000);
    }
    
    else{
      setpromopopupDisplay("none");
    }

    // CurrentIteration
    
    
  },[]);
    




  return (
    <>
    <div onClick={toggleShow} className="fab-wrapper_promo" style={{ zIndex: "999", display : promoDispaly }}>
          <label className="fab_promo">
              Apply Promo
          </label>
        </div>
      {/* <Draggable  draggable={false}> */}
        <div id="mydiv"  className={hideclass} style={{height: PopupHeight, display: promopopupDisplay}} >
          <span onClick={toggleShow} class="close">
            <img
                src={Close}
                alt="Close"
                width="12"
                height="20"
                className="d-inline-block align-text-top closeimg"
              />
              </span>
          <div id="mydivheader">
            <h2 class="h2_head">{DisplayText1}</h2>
            <h4 class="h4_head">{DisplayText2}</h4>
          </div>

          <div id='promo_succes'></div>
          <div id='card_body'>
            <form action="/action_page.php">
              {/* <div className="row"> */}
                {/* <div className="col-md-12 left-pan"> */}
                  <input style={{display: isHide }} type="email" id="fname" class="input_f" name="fname" readOnly={isDisabled}  placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                  <input type="text" id="lname" class="input_f" name="lname" placeholder='Enter Promo Code' onChange={(e) => setPromocode(e.target.value)} value={promocode} />
                  {/* <div id="error-popup" className="error-text errospan  "></div> */}
                {/* </div> */}
                {/* <div className="col-md-12 right-pan"> */}
                  <input onClick={handlelogin} type="button" id="submit_btn" disabled={submit_disable} class='btn_sub' value="Submit" />
                  <span className='form_term'>*By Signing up you agree to our <a href='/documents/terms-and-conditions'>
                    <strong className='tc_link' >Terms and Conditions</strong></a></span>
                {/* </div> */}
              {/* </div> */}
              
              
            </form>
          </div>
        </div>
      {/* </Draggable> */}
      
    </>
  )
}

export default DraggableModel;