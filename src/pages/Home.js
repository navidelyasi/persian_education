import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { getAllExercises } from "../services/firebaseServices";
import { prepareExercises } from "../hooks/prepare-qs-for-answering";
import girl from "../icons/cute-girl.png";

import { animated, useSpring } from "@react-spring/web";
import { show1style, show2style } from "../constants/styles";
import "../components/card.css";
import MovingElement from "../components/MovingElement";

export default function Home() {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  const level = "1";
  const unit = "1";

  const getExercises = async () => {
    let _exercises = await getAllExercises(level, unit);
    _exercises = prepareExercises(_exercises);

    console.log("from home page , exercises : ___ ", _exercises);
    setExercises(_exercises);
    apishow2.start(show2style);
    console.log(exercises);
  };

  useEffect(() => {
    getExercises();
  }, []);

  const show1 = useSpring(show1style);

  const [show2, apishow2] = useSpring(() => {});

  return (
    <animated.div style={show1}>
      <NavBar />
      <br /> <hr />
      <div className="fixed-bottom">
        <MovingElement />
      </div>
      <div className="container">
        <div className="row">
          <div className="col clearfix">
            <div className="clearfix">
              <button
                className="btn btn-outline-success float-end"
                onClick={() => {
                  navigate("/music");
                }}
              >
                صفحه ویژه برای موزیک
              </button>
            </div>
            <br />
            <div className="clearfix">
              <button
                className="btn btn-outline-success float-end"
                onClick={() => {
                  navigate("/create-exercise-cards-study", {
                    state: { level: "1", unit: "1", number: 5 },
                  });
                }}
              >
                ساختن کارت های آموزشی
              </button>
            </div>
            <br />
            <div className="clearfix">
              <button
                className="btn btn-outline-success float-end"
                onClick={() => {
                  // navigate("/create-exercise-multi", {
                  //   state: { level: "1", unit: "1", number: 5 },
                  // });
                }}
              >
                ساختن سوال های چند گزینه ای
              </button>
            </div>
            <br />
            <div className="clearfix">
              <button
                className="btn btn-outline-success float-end"
                onClick={() => {
                  // navigate("/create-exercise-filling", {
                  //   state: { level: "3", unit: "1", number: 1 },
                  // });
                }}
              >
                ساختن سوال های جای خالی در متن
              </button>
            </div>
          </div>
          <div className="col">
            {exercises.length > 1 ? (
              <animated.div style={show2}>
                <ul className="list-group">
                  {exercises.map((exercise, exerciseIndex) => (
                    <div
                      className="clearfix"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/answer-one-exercise", {
                          state: { exercise },
                        });
                      }}
                    >
                      <h4 className="text-primary float-end">
                        .{exercise.unit}
                      </h4>
                      <h4 className="text-primary float-end">
                        .{exercise.number}
                      </h4>
                      <h4 className="float-end" key={exerciseIndex}>
                        {exercise.title}
                      </h4>
                    </div>
                  ))}
                </ul>
                <button
                  className="btn btn-lg btn-outline-success"
                  onClick={() => {
                    navigate("/answer-exercises", {
                      state: { exercises },
                    });
                  }}
                >
                  انجام دادن تمرین ها
                </button>
              </animated.div>
            ) : (
              <h2>is loading ...</h2>
            )}
          </div>
        </div>
      </div>
    </animated.div>
  );
}
