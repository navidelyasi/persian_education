import React, { useEffect, useState } from "react";
import NavBar from "../components/general/NavBar";
import { useNavigate } from "react-router-dom";
import { getAllExercises } from "../hooks/firebaseServices";
import { prepareExercises } from "../hooks/prepare-qs-for-answering";
import girl from "../data/icons/cute-girl.png";

import { animated, useSpring } from "@react-spring/web";
import { show1style, show2style } from "../data/constants/styles";
import "../components/css/card.css";
import MovingElement from "../components/general/MovingElement";

export default function Level1() {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  const level = "1";
  const unit = "1";

  const getExercises = async () => {
    let _exercises = await getAllExercises(level, unit);
    _exercises = prepareExercises(_exercises);

    console.log("from home Level 1 page , exercises : ___ ", _exercises);
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
                style={{ fontSize: "22px" }}
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
                style={{ fontSize: "22px" }}
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
                style={{ fontSize: "22px" }}
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
                style={{ fontSize: "22px" }}
                onClick={() => {
                  // navigate("/create-exercise-filling", {
                  //   state: { level: "1", unit: "1", number: 6 },
                  // });
                }}
              >
                ساختن سوال های جای خالی در متن
              </button>
            </div>
          </div>
          <div className="col">
            {exercises.length > 0 ? (
              <animated.div style={show2}>
                <ul className="list-group">
                  {exercises.map((exercise, exerciseIndex) => (
                    <div
                      className="clearfix"
                      style={{ cursor: "pointer", fontSize: "22px" }}
                      onClick={() => {
                        navigate("/answer-exercises", {
                          state: { exercises, exerciseIndex },
                        });
                      }}
                    >
                      <h2 className="text-primary float-end">
                        .{exercise.unit}
                      </h2>
                      <h2 className="text-primary float-end">
                        .{exercise.number}
                      </h2>
                      <h2 className="float-end" key={exerciseIndex}>
                        {exercise.title}
                      </h2>
                    </div>
                  ))}
                </ul>
                <button
                  className="btn btn-lg btn-outline-success"
                  style={{ fontSize: "22px" }}
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
