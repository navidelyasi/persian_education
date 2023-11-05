import React, { useEffect } from "react";
import NavBar from "../components/general/NavBar";
import { useNavigate } from "react-router-dom";
import { exerciseStore } from "../database/exercise-store";
import { animated, useSpring } from "@react-spring/web";
import { show1style } from "../data/constants/styles";
import "../components/css/card.css";
import MovingElement from "../components/general/MovingElement";

function Level1() {
  const { data, getExercises, setIndex } = exerciseStore();
  const navigate = useNavigate();

  const show1 = useSpring(show1style);

  const [show2, apishow2] = useSpring(() => {});

  useEffect(() => {
    getExercises("1", "1");
  }, []);

  console.log("exercises are : ", data);

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
            {data.length > 0 ? (
              <animated.div style={show2}>
                <ul className="list-group">
                  {data.map((exercise, exerciseIndex) => (
                    <div
                      key={exerciseIndex}
                      className="clearfix"
                      style={{ cursor: "pointer", fontSize: "22px" }}
                      onClick={() => {
                        setIndex(exerciseIndex);
                        navigate("/answer-exercises");
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
                    setIndex(0);
                    navigate("/answer-exercises");
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

export default Level1;
