import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function BodyFillingText({
  question,
  questionIndex,
  handleChange,
}) {
  return (
    <div className="card" key={question.docId}>
      <div className="card-body">
        <div className="clearfix">
          <h1 className="float-end">{question.title}</h1>
        </div>
        {question.body.map((line, lineIndex) => (
          <div
            key={question.docId + "-" + lineIndex}
            // className="d-flex p-2 g-2"
            className="d-flex flex-row-reverse"
            style={{ gap: "10px" }}
          >
            {line.map((str, strIndex) =>
              strIndex % 2 ? (
                <input
                  key={question.docId + "-" + lineIndex + "-" + strIndex}
                  type="text"
                  size={str.length + 2}
                  className={
                    question.submitted &&
                    (str === question.answers[lineIndex][strIndex]
                      ? "bg-success"
                      : "bg-danger")
                  }
                  autocomplete="off"
                  name={question.docId + "-" + lineIndex + "-" + strIndex}
                  value={question.answers[lineIndex][strIndex]}
                  onChange={(event) =>
                    handleChange(questionIndex, lineIndex, strIndex, event)
                  }
                />
              ) : (
                <p>{str}</p>
              )
            )}
            {question.helped &&
              question.answers[lineIndex].length > 1 &&
              question.answers[lineIndex].map((str, strIndex) =>
                strIndex % 2 ? null : (
                  <div key={uuidv4()} className="btn btn-secondary">
                    {str}
                  </div>
                )
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
