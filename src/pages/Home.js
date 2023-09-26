import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { getAllExercises } from "../services/firebaseServices";
import { prepareExercises } from "../hooks/prepare-qs-for-answering";

import brightnotification from "../sounds/bright-notifications-151766.mp3";
import clickButton from "../sounds/click-button-menu-147349.mp3";
import dynamo from "../sounds/dynamo-163602.mp3";
import errorcall from "../sounds/error-call-to-attention-129258.mp3";
import interface12 from "../sounds/interface-124464.mp3";
import levelpassed from "../sounds/level-passed-143039.mp3";
import notification2 from "../sounds/notification-2-125763.mp3";
import notification4 from "../sounds/notification-4-126507.mp3";
import wronganswer from "../sounds/wrong-answer-126515.mp3";

export default function Home() {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  const level = "1";
  const unit = "1";

  const getExercises = async () => {
    let _exercises = await getAllExercises(level, unit);
    _exercises = prepareExercises(_exercises);
    setExercises(_exercises);
    console.log(exercises);
  };

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <>
      <NavBar />
      <br /> <hr />
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
                  navigate("/create-exercise-filling", {
                    state: { level: "3", unit: "1", number: 1 },
                  });
                }}
              >
                ساختن سوال های جای خالی در متن
              </button>
            </div>
          </div>
          <div className="col">
            {exercises.length > 1 ? (
              <>
                <ul className="list-group">
                  {exercises.map((exercise, exerciseIndex) => (
                    <div className="clearfix">
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
                    playnotification2();
                    navigate("/answer-exercises", {
                      state: { exercises },
                    });
                  }}
                >
                  انجام دادن تمرین ها
                </button>
              </>
            ) : (
              <h2>is loading ...</h2>
            )}
          </div>
        </div>
        <button onClick={playbrightnotification}>brightnotification</button>
        <br />
        <button onClick={playclickButton}>clickButton</button>
        <br />
        <button onClick={playdynamo}>dynamo</button>
        <br />
        <button onClick={playerrorcall}>errorcall</button>
        <br />
        <button onClick={playinterface12}>interface12</button>
        <br />
        <button onClick={playlevelpassed}>levelpassed</button>
        <br />
        <button onClick={playnotification2}>notification2</button>
        <br />
        <button onClick={playnotification4}>notification4</button>
        <br />
        <button onClick={playwronganswer}>wronganswer</button>
      </div>
    </>
  );

  function playbrightnotification() {
    new Audio(brightnotification).play();
  }
  function playclickButton() {
    new Audio(clickButton).play();
  }
  function playdynamo() {
    new Audio(dynamo).play();
  }
  function playerrorcall() {
    new Audio(errorcall).play();
  }
  function playinterface12() {
    new Audio(interface12).play();
  }
  function playlevelpassed() {
    new Audio(levelpassed).play();
  }
  function playnotification2() {
    new Audio(notification2).play();
  }
  function playnotification4() {
    new Audio(notification4).play();
  }
  function playwronganswer() {
    new Audio(wronganswer).play();
  }
}
