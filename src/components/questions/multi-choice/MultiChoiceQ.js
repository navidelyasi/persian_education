import React, { useState } from "react";

export default function MultiChoiceQuestion(props) {
  const { title, choices, correct, docId } = props.question;
  const [localTitle, setLocalTitle] = useState(title);
  const [localChoices, setLocalChoices] = useState(choices);
  const [localCorrect, setLocalCorrect] = useState(correct);
  const [newChoice, setNewChoice] = useState("new choice");

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col"></div>
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
            {localChoices.length < 2 && (
              <div className="alert alert-warning">
                each question needs at least 2 choices, and max is 4
              </div>
            )}
            <ul className="list-group">
              {localChoices.map((choice, i) => (
                <li
                  className={
                    i === localCorrect
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                >
                  <div className="d-flex justify-content-between align-items-center">
                    {choice}
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-success align-items-end"
                        onClick={() => {
                          setLocalCorrect(i);
                        }}
                      >
                        set as correct answer
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger align-items-end"
                        onClick={() => {
                          setLocalChoices(
                            localChoices.filter((value, index) => {
                              if (index !== i) return value;
                            })
                          );
                          if (i === localCorrect) setLocalCorrect(-1);
                          if (i < localCorrect)
                            setLocalCorrect(localCorrect - 1);
                        }}
                      >
                        x delete x
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {localCorrect === -1 && (
              <div className="alert alert-warning">
                need to select correct choice
              </div>
            )}
            <br />
            <div className="d-flex justify-content-between align-items-center">
              <input
                className="form-control"
                id="newchoice"
                type="text"
                placeholder={newChoice}
                value={newChoice}
                onChange={(e) => setNewChoice(e.target.value)}
              />
              <button
                className="btn btn-sm btn-outline-primary"
                disabled={localChoices.length > 3}
                onClick={() => {
                  setLocalChoices(localChoices.concat([newChoice]));
                  setNewChoice("new choice");
                }}
              >
                Add Choice
              </button>
            </div>
            <br />
            <button
              className="btn btn-success"
              disabled={
                localChoices.length < 2 ||
                localCorrect === -1 ||
                localTitle.length < 4
              }
              onClick={() => {
                props.handleChangeInQuestions({
                  docId,
                  title: localTitle,
                  choices: localChoices,
                  correct: localCorrect,
                });
              }}
            >
              Update the question and go back to the list of all questions
            </button>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
}
