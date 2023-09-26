import React, { useState } from "react";

export default function BodyMultiChoice({
  questions,
  selectedQuestion,
  questionIndex,
  setQuestions,
}) {
  let question = "";
  if (questions.length > 1) {
    question = questions[selectedQuestion];
  }

  const onSelect = (choiceIndex) => {
    let _questions = [...questions];
    _questions[selectedQuestion].choosen = choiceIndex;
    setQuestions(_questions);
  };

  return (
    <>
      {questions.length > 1 && (
        <div key={selectedQuestion} className="container">
          <div className="row">
            <div className="col">
              <div className="clear-fix">
                <h1 className="float-end">{question.title}</h1>
              </div>
              <ul className="list-group">
                {question.choices.map((choice, choiceIndex) =>
                  question.submitted ? (
                    <li
                      key={choiceIndex}
                      className={
                        question.choosen === question.correct
                          ? choiceIndex === question.choosen
                            ? "list-group-item text-white bg-success"
                            : "list-group-item"
                          : choiceIndex === question.choosen
                          ? "list-group-item text-white bg-danger"
                          : choiceIndex === question.correct
                          ? "list-group-item text-white bg-primary"
                          : "list-group-item"
                      }
                    >
                      <h5 className="float-end">{choice}</h5>
                    </li>
                  ) : (
                    <li
                      key={choiceIndex}
                      className={
                        choiceIndex === question.choosen
                          ? "list-group-item active"
                          : "list-group-item"
                      }
                      onClick={() => {
                        onSelect(choiceIndex);
                      }}
                    >
                      <h5 className="float-end">{choice}</h5>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
