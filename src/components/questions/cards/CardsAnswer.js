import React, { useState, useRef, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { show2style } from "../../../data/constants/styles";
import ListQs from "../ListQs";
import "../../css/card.css";
import prepare4Cards from "./prepare4Cards";
import { exerciseStore } from "../../../database/exercise-store";
import prepareMoveToNext from "./prepareMoveToNext";

export default function CardsAnswer() {
  const { data, index, qindex, setQIndex, setExercises } = exerciseStore();

  const questions = data[index].questions;

  const [isSelected, setIsSelected] = useState(false);
  const [choices, setChoices] = useState([]);
  const nextQuestionTimeoutRef = useRef(null);

  const prepareQuestion = () => {
    setChoices(prepare4Cards(questions, qindex));
    setIsSelected(false);
  };

  useEffect(() => {
    prepareQuestion();
  }, [qindex]);

  const cardSelected = async (i) => {
    setIsSelected(true);
    let _choices = [...choices];
    _choices[i].rotate = 180;
    setChoices(_choices);

    const _questions = await prepareMoveToNext(
      nextQuestionTimeoutRef,
      questions,
      qindex,
      choices,
      i
    );
    let _exercises = data;
    _exercises[index].questions = _questions;
    setExercises(_exercises);

    qindex === questions.length - 1 ? setQIndex(0) : setQIndex(qindex + 1);
  };

  const show2 = useSpring(show2style);
  return (
    <div className="container">
      <div className="row">
        <div className="col-2 opacity-75">
          <ListQs />
        </div>
        <div className="col-10 shadow p-3 mb-5 bg-body rounded">
          <hr />
          <animated.div style={show2}>
            <div className="d-flex justify-content-center">
              <h1>{questions[qindex].name2}</h1>
            </div>
            <hr />
            <br />
            <div className="d-flex justify-content-center">
              <div className="row row-cols-1 row-cols-sm-1 row-cols.md-2 row-cols-lg-auto g-4">
                {choices &&
                  choices.map((card, i) => (
                    <div className="col" key={card.name1}>
                      <div className="maincontainer">
                        <div
                          className="thecard"
                          style={{ transform: `rotateY(${card.rotate}deg)` }}
                          onClick={() => {
                            if (!isSelected) {
                              cardSelected(i);
                            }
                          }}
                        >
                          <div className="thefront cardcontent">
                            <img
                              src={card.source}
                              alt={card.name1}
                              style={{ width: "150px", height: "150px" }}
                            />
                          </div>

                          <div className="theback cardcontent">
                            <p style={{ fontSize: "50px" }}>{card.name2}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <br />
            <hr />
          </animated.div>
        </div>
      </div>
    </div>
  );
}
