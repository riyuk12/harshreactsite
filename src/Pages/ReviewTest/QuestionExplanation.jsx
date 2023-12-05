import React, { useState } from "react";
import parse from "html-react-parser";

const QuestionExplanation = ({ items }) => {
  const [openExplanation, setOpenExplanation] = useState(false);
  console.log("setOpenExplanation", openExplanation);
  return (
    <>
      <p className="m-0 mt-2">
        <a
          style={{
            cursor: "pointer",
          }}
          className="m-2"
          data-toggle="collapse"
          href={`#collapseExample/${items.quesId}`}
          role="button"
          aria-expanded="false"
          aria-controls={`collapseExample/${items.quesId}`}
          id={`${items.quesId}`}
          onClick={() => {
            setOpenExplanation(!openExplanation);
          }}
        >
          {!openExplanation ? "Open Explanation" : "Close Explanation"}
        </a>
      </p>
      <div className="collapse" id={`#collapseAnswer/${items.quesId}`}>
        <div className="card card-body"></div>
      </div>
      <div className="collapse" id={`collapseExample/${items.quesId}`}>
        <div className="card card-body explaination-card">
          {items.explanation ? (
            <div>{parse(String(items.explanation))}</div>
          ) : (
            "No Explanation"
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionExplanation;
