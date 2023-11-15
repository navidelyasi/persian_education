import React, { useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { show1style } from "../../data/constants/styles";
import back from "../../data/icons/skip-start.svg";
import next from "../../data/icons/skip-end.svg";
import { exerciseStore } from "../../database/exercise-store";
import {
  playnotification2,
  playdynamo,
} from "../../hooks/handle-sound-effects";
import { doSubmitQAnswer } from "../../hooks/handle-questions";

export default function Buttons({ handleHelp }) {
  const { data, index, qindex, setQIndex, setExercises } = exerciseStore();
  const nextQuestionTimeoutRef = useRef(null);
  const questions = data[index].questions;

  const handleSubmit = () => {
    let _data = [...data];
    _data[index].questions = doSubmitQAnswer(
      data[index].questions,
      qindex,
      data[index].type
    );
    setExercises(_data);

    if (nextQuestionTimeoutRef.current) {
      clearTimeout(nextQuestionTimeoutRef.current);
    }
    nextQuestionTimeoutRef.current = setTimeout(() => {
      if (qindex === questions.length - 1) {
        setQIndex(0);
      } else {
        setQIndex(qindex + 1);
      }
    }, 1500);
  };

  const show1 = useSpring(show1style);

  return (
    <animated.div style={show1}>
      <div className="container-fluid d-flex justify-content-center">
        <div className="w-75 btn-group btn-group-sm mx-auto">
          {questions.length > 1 && (
            <button
              className={
                qindex > 0
                  ? "btn btn-outline-primary"
                  : "btn btn-outline-primary disabled"
              }
              onClick={() => {
                playnotification2();
                setQIndex(qindex - 1);
              }}
            >
              <img
                src={back}
                alt="back"
                style={{ width: "30px", height: "30px", color: "white" }}
              />
            </button>
          )}
          <button
            className="btn btn-outline-success"
            onClick={() => {
              if (!data[index].questions[qindex].submitted) {
                handleSubmit();
              }
            }}
          >
            submit question
          </button>

          {handleHelp && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                playdynamo();
                handleHelp();
              }}
            >
              help
            </button>
          )}
          {questions.length > 1 && (
            <button
              className={
                qindex < questions.length - 1
                  ? "btn btn-outline-primary"
                  : "btn btn-outline-primary disabled"
              }
              onClick={() => {
                playnotification2();
                setQIndex(qindex + 1);
              }}
            >
              <img
                src={next}
                alt="next"
                style={{ width: "30px", height: "30px", color: "blue" }}
              />
            </button>
          )}
        </div>
      </div>
    </animated.div>
  );
}
