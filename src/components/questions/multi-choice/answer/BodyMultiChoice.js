import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { show2style } from "../../../../data/constants/styles";
import Buttons from "../../../exercises/Buttons";
import ListQs from "../../ListQs";
import { exerciseStore } from "../../../../database/exercise-store";
import "../multi.css";

export default function BodyMultiChoice() {
  const { data, index, qindex, setExercises } = exerciseStore();

  const questions = data[index].questions;

  const onSelect = (choiceIndex) => {
    let _data = [...data];
    _data[index].questions[qindex].choosen = choiceIndex;
    setExercises(_data);
  };

  const show2 = useSpring(show2style);

  return (
    <div className="question-container">
      <div className="">
        <ListQs />
      </div>
      <div className="">
        <animated.div style={show2}>
          <div className="title">
            <h1>{questions[qindex].title}</h1>
          </div>
          <ul className="list">
            {questions[qindex].choices.map((choice, choiceIndex) =>
              questions[qindex].submitted ? (
                <li
                  key={choiceIndex}
                  className={
                    questions[qindex].choosen === questions[qindex].correct
                      ? choiceIndex === questions[qindex].choosen
                        ? "item item-success"
                        : "item"
                      : choiceIndex === questions[qindex].choosen
                      ? "item item-fail"
                      : choiceIndex === questions[qindex].correct
                      ? "item item-success"
                      : "item"
                  }
                >
                  <h5>{choice}</h5>
                </li>
              ) : (
                <li
                  key={choiceIndex}
                  className={
                    choiceIndex === questions[qindex].choosen
                      ? "item item-selected"
                      : "item"
                  }
                  onClick={() => {
                    onSelect(choiceIndex);
                  }}
                >
                  <h5>{choice}</h5>
                </li>
              )
            )}
          </ul>
          <br />
          <Buttons />
        </animated.div>
      </div>
      <div></div>
    </div>
  );
}
