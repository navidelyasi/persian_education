import React, { useState } from "react";

export default function FillingTextQ(props) {
  const { title, body, docId } = props.question;
  const [localTitle, setLocalTitle] = useState(title);
  const [localBody, setLocalBody] = useState(body);

  return (
    <div className="container">
      <div className="row">
        <div className="col"> </div>
        <div className="col-10">
          {localTitle.length < 4 && (
            <div className="alert alert-warning">
              Question title needs to be filled
            </div>
          )}
          <input
            className="form-control"
            type="text"
            placeholder={localTitle}
            value={localTitle}
            onChange={(e) => {
              setLocalTitle(e.target.value);
            }}
          />
          <br />

          {localBody.length < 10 && (
            <div className="alert alert-warning">
              Before each word you want to be filled by student, put an @ sign.
              just that :&#41;
            </div>
          )}

          <textarea
            className="form-control"
            type="text-area"
            rows="15"
            placeholder={localBody}
            value={localBody}
            onChange={(e) => {
              setLocalBody(e.target.value);
            }}
          />
          <br />
          <button
            className="btn btn-success"
            disabled={localBody.length < 10 || localTitle.length < 4}
            onClick={() => {
              props.handleChangeInQuestions({
                docId,
                title: localTitle,
                body: localBody,
              });
            }}
          >
            Update the question and go back to the list of all questions
          </button>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
