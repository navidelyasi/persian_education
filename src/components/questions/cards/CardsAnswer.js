import React, { useState, useRef, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { show2style } from "../../../data/constants/styles";
import ListQs from "../ListQs";

import "../../css/card.css";
import {
  playbrightnotification,
  playinterface12,
  playwronganswer,
} from "../../../hooks/handle-sound-effects";
import { shuffle } from "../../../hooks/prepare-qs-for-answering";
import Swal from "sweetalert2";

export default function CardsAnswer({
  questions,
  setQuestions,
  selectedQuestion,
  setSelectedQuestion,
}) {
  const [isSelected, setIsSelected] = useState(false);
  const [choices, setChoices] = useState([]);
  const nextQuestionTimeoutRef = useRef(null);

  const prepareChoices = () => {
    let _choices = [
      {
        ...questions[selectedQuestion],
        index: selectedQuestion,
        rotate: 0,
        source: require(`../../../data/icons/unit11/${questions[selectedQuestion].name1}.png`),
      },
    ];
    for (let i = 1; i < 4; i++) {
      let myRand = -1;
      while (myRand === -1) {
        let _myRand = Math.floor(Math.random() * questions.length);
        let repeated = false;
        _choices.forEach((item) => {
          if (item.index === _myRand) {
            repeated = true;
          }
        });
        if (!repeated) {
          myRand = _myRand;
          _choices.push({
            ...questions[myRand],
            index: myRand,
            rotate: 0,
            source: require(`../../../data/icons/unit11/${questions[myRand].name1}.png`),
          });
        }
      }
    }

    _choices = shuffle(_choices);

    console.log("point 1", _choices);
    setChoices(_choices);
    setIsSelected(false);
  };

  useEffect(() => {
    prepareChoices();
  }, [selectedQuestion]);

  const cardSelected = (i) => {
    setIsSelected(true);
    let _choices = [...choices];
    _choices[i].rotate = 180;
    setChoices(_choices);
    playinterface12();

    // Clear any previous timeouts
    if (nextQuestionTimeoutRef.current) {
      clearTimeout(nextQuestionTimeoutRef.current);
    }

    // Set a timeout to increment selectedQuestion after # second
    nextQuestionTimeoutRef.current = setTimeout(() => {
      let _questions = [...questions];
      _questions[selectedQuestion].submitted = true;
      if (choices[i].index === selectedQuestion) {
        console.log("true");
        _questions[selectedQuestion].result = 1;
        playbrightnotification();
        Swal.fire("Good job!", "You selected currect one!");
      } else {
        console.log("false");
        _questions[selectedQuestion].result = 0;
        playwronganswer();
        Swal.fire("No", "You selected wrong!");
      }

      setQuestions(_questions);

      if (selectedQuestion === questions.length - 1) {
        setSelectedQuestion(0);
      } else {
        setSelectedQuestion(selectedQuestion + 1);
      }
    }, 2000);
  };

  // Use the useSpring hook inside the render function to animate show2
  const show2 = useSpring(show2style);

  return (
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
          <hr />
          <animated.div style={show2}>
            <div className="d-flex justify-content-center">
              <h1>{questions[selectedQuestion].name2}</h1>
            </div>
            <hr />
            <br />
            <div className="d-flex justify-content-center">
              <div className="row row-cols-1 row-cols-sm-1 row-cols.md-2 row-cols-lg-auto g-4">
                {choices &&
                  choices.map((q, i) => (
                    <div className="col" key={q.name1}>
                      <div className="maincontainer">
                        <div
                          className="thecard"
                          style={{ transform: `rotateY(${q.rotate}deg)` }}
                          onClick={() => {
                            if (!isSelected) {
                              cardSelected(i);
                            }
                          }}
                        >
                          <div className="thefront cardcontent">
                            <img
                              src={q.source}
                              alt={q.name1}
                              style={{ width: "150px", height: "150px" }}
                            />
                          </div>

                          <div className="theback cardcontent">
                            <p style={{ fontSize: "50px" }}>{q.name2}</p>
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
