import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { utilitySliceActions } from "../../../Redux/Slice/UtilitySlice";

function Tooltip({ handleButtonClickAutoScroll }) {
  const dispatch = useDispatch();

  return (
    <section
      style={{
        position: "absolute",
        top: "40px",
        zIndex: "999",
      }}
    >
      <div
        style={{
          position: "relative",
          left: "171px",
          top: "1px",
          // transform: "translateX(-50%)",
          width: "12px",
          height: " 9px",
          backgroundColor: " rgb(129, 12, 178)",
          clipPath: "polygon(0px 100%, 50% 0px, 100% 100%)",
        }}
      ></div>
      <div>
        <div
          className="card-body"
          style={{
            border: "2px #810cb2 solid",
            borderRadius: "10px",
            background: "white",
          }}
        >
          <p className="card-text m-0" style={{ fontSize: "13px" }}>
            Do You Want To Enable Auto Scroll?
          </p>
          <button
            className="mr-3"
            style={{
              backgroundColor: "rgb(129, 12, 178)",
              color: "rgb(255, 255, 255)",
              fontSize: "13px",
              padding: "0.25rem 0.5rem",
              borderRadius: "5px",
              marginTop: "10px",
              border: " none",
              outline: "none",
            }}
            onClick={() => {
              dispatch(utilitySliceActions.setAutoScroll(true));
              handleButtonClickAutoScroll(1);
            }}
          >
            Yes
          </button>
          <button
            style={{
              backgroundColor: "rgb(129, 12, 178)",
              color: "rgb(255, 255, 255)",
              fontSize: "13px",
              padding: "0.25rem 0.5rem",
              borderRadius: "5px",
              marginTop: "10px",
              border: " none",
              outline: "none",
            }}
            onClick={() => {
              dispatch(utilitySliceActions.setAutoScroll(false));
              handleButtonClickAutoScroll(1);
            }}
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
}

export default Tooltip;
