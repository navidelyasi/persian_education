import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSpring, animated } from "@react-spring/web";
import { show2style } from "../../../../data/constants/styles";
import Buttons from "../../../exercises/Buttons";
import ListQs from "../../ListQs";
import { exerciseStore } from "../../../../database/exercise-store";
import "../filling.css";

export default function BodyFillingText() {
  const { data, index, qindex, setExercises } = exerciseStore();

  const questions = data[index].questions;

  // #########################################################################
  // ##################          handle change              ##################
  // #########################################################################
  const handleChange = (lineIndex, strIndex, event) => {
    let _data = [...data];
    _data[index].questions[qindex].answers[lineIndex][strIndex] =
      event.target.value;
    setExercises(_data);
  };

  // #########################################################################
  // ##################          handle help              ####################
  // #########################################################################
  const handleHelp = () => {
    let _data = [...data];
    _data[index].questions[qindex].helped =
      !_data[index].questions[qindex].helped;
    setExercises(_data);
  };

  // #########################################################################
  // ##################          ANIMATIONS                 ##################
  // #########################################################################
  const show2 = useSpring(show2style);
  const [show3, apishow3] = useSpring(() => {});
  if (questions[qindex].helped) {
    apishow3.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 1000 },
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-2 opacity-75">
          <ListQs />
        </div>
        <div className="col-10 shadow p-3 mb-5 bg-body rounded">
          {questions && (
            <div className="card" key={questions[qindex].docId}>
              <animated.div style={show2}>
                <div className="card-body">
                  <div className="clearfix">
                    <h1 className="float-end">{questions[qindex].title}</h1>
                  </div>
                  {questions &&
                    questions[qindex].body.map((line, lineIndex) => (
                      <div
                        key={questions[qindex].docId + "-" + lineIndex}
                        className="line"
                      >
                        {line.map((str, strIndex) =>
                          strIndex % 2 ? (
                            <input
                              key={
                                questions[qindex].docId +
                                "-" +
                                lineIndex +
                                "-" +
                                strIndex
                              }
                              type="text"
                              size={str.length + 2}
                              className={
                                questions[qindex].submitted
                                  ? str ===
                                    questions[qindex].answers[lineIndex][
                                      strIndex
                                    ]
                                    ? "input input-success"
                                    : "input input-fail"
                                  : "input"
                              }
                              disabled={questions[qindex].submitted}
                              autocomplete="off"
                              name={
                                questions[qindex].docId +
                                "-" +
                                lineIndex +
                                "-" +
                                strIndex
                              }
                              value={
                                questions[qindex].answers[lineIndex][strIndex]
                              }
                              onChange={(event) =>
                                handleChange(lineIndex, strIndex, event)
                              }
                            />
                          ) : (
                            <p
                              key={
                                questions[qindex].docId +
                                "-" +
                                lineIndex +
                                "-" +
                                strIndex
                              }
                            >
                              {str}
                            </p>
                          )
                        )}
                        {questions[qindex].helped &&
                          questions[qindex].answers[lineIndex].length > 1 &&
                          questions[qindex].answers[lineIndex].map(
                            (str, strIndex) =>
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
                    ))}
                </div>
              </animated.div>
            </div>
          )}
          <br />
          <Buttons handleHelp={handleHelp} />
        </div>
      </div>
    </div>
  );
}
