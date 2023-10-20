import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { show2style } from "../../../../constants/styles";
import Buttons from "../../../exercises/Buttons";
import ListQs from "../../ListQs";

// import { show1 } from "../../../../constants/styles";

export default function BodyMultiChoice({
  questions,
  setQuestions,
  selectedQuestion,
  setSelectedQuestion,
  handleHelp,
  handleSubmit,
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

  const show2 = useSpring(show2style);

  return (
    <>
      {questions.length > 1 && (
        <div key={selectedQuestion} className="container">
          <div className="row">
            <div className="col-2 opacity-75">
              <ListQs
                questions={questions}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
              />
            </div>
            <div className="col-10 shadow p-3 mb-5 bg-body rounded">
              <animated.div style={show2}>
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
                <br />
                <Buttons
                  allItems={questions}
                  itemType="question"
                  selectedItem={selectedQuestion}
                  setSelectedItem={setSelectedQuestion}
                  handleHelp={handleHelp}
                  handleSubmit={handleSubmit}
                />
              </animated.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
