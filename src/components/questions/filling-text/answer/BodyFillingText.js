import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSpring, animated } from "@react-spring/web";
import { show2style } from "../../../../constants/styles";
import Buttons from "../../../exercises/Buttons";
import ListQs from "../../ListQs";

export default function BodyFillingText({
  questions,
  selectedQuestion,
  handleChange,
  setSelectedQuestion,
  handleHelp,
  handleSubmit,
}) {
  const [help, setHelp] = useState(false);

  const show2 = useSpring(show2style);
  const [show3, apishow3] = useSpring(() => {});

  if (questions[selectedQuestion].helped) {
    apishow3.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 1000 },
    });
  }

  // const hhelp = () => {
  //   if (help) {
  //     setHelp(false);
  //     apishow3.start({
  //       from: { opacity: 1 },
  //       to: { opacity: 0 },
  //       config: { duration: 1000 },
  //     });
  //   } else {
  //     setHelp(true);
  //     apishow3.start({
  //       from: { opacity: 0 },
  //       to: { opacity: 1 },
  //       config: { duration: 1000 },
  //     });
  //   }
  // };

  console.log("questions from body filling text ___ : ", questions);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2 opacity-75">
            <ListQs
              questions={questions}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
            />
          </div>
          <div className="col-10 shadow p-3 mb-5 bg-body rounded">
            {questions && (
              <div className="card" key={questions[selectedQuestion].docId}>
                <animated.div style={show2}>
                  <div className="card-body">
                    <div className="clearfix">
                      <h1 className="float-end">
                        {questions[selectedQuestion].title}
                      </h1>
                    </div>
                    {questions &&
                      questions[selectedQuestion].body.map(
                        (line, lineIndex) => (
                          <div
                            key={
                              questions[selectedQuestion].docId +
                              "-" +
                              lineIndex
                            }
                            // className="d-flex p-2 g-2"
                            className="d-flex flex-row-reverse"
                            style={{ gap: "10px" }}
                          >
                            {line.map((str, strIndex) =>
                              strIndex % 2 ? (
                                <input
                                  key={
                                    questions[selectedQuestion].docId +
                                    "-" +
                                    lineIndex +
                                    "-" +
                                    strIndex
                                  }
                                  type="text"
                                  size={str.length + 2}
                                  className={
                                    questions[selectedQuestion].submitted &&
                                    (str ===
                                    questions[selectedQuestion].answers[
                                      lineIndex
                                    ][strIndex]
                                      ? "bg-success"
                                      : "bg-danger")
                                  }
                                  autocomplete="off"
                                  name={
                                    questions[selectedQuestion].docId +
                                    "-" +
                                    lineIndex +
                                    "-" +
                                    strIndex
                                  }
                                  value={
                                    questions[selectedQuestion].answers[
                                      lineIndex
                                    ][strIndex]
                                  }
                                  onChange={(event) =>
                                    handleChange(
                                      selectedQuestion,
                                      lineIndex,
                                      strIndex,
                                      event
                                    )
                                  }
                                />
                              ) : (
                                <p>{str}</p>
                              )
                            )}
                            {questions[selectedQuestion].helped &&
                              questions[selectedQuestion].answers[lineIndex]
                                .length > 1 &&
                              questions[selectedQuestion].answers[
                                lineIndex
                              ].map((str, strIndex) =>
                                strIndex % 2 ? null : (
                                  <animated.div style={show3}>
                                    <div
                                      key={uuidv4()}
                                      className="btn btn-secondary"
                                    >
                                      {str}
                                    </div>
                                  </animated.div>
                                )
                              )}
                          </div>
                        )
                      )}
                  </div>
                </animated.div>
              </div>
            )}
            <br />
            <Buttons
              allItems={questions}
              itemType="question"
              selectedItem={selectedQuestion}
              setSelectedItem={setSelectedQuestion}
              handleHelp={handleHelp}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
