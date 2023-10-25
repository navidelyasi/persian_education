import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LimitedNavBar from "../../components/general/LimitedNavBar";
import { useLocation } from "react-router-dom";
import Buttons from "../../components/exercises/Buttons";
import AnswerQsComponent from "../../components/exercises/AnswerQsComponent";

export default function AnswerExercises() {
  const location = useLocation();
  const [exercises, setExercises] = useState(location.state.exercises);
  const [selectedExercise, setSelectedExercise] = useState(
    location.state.exerciseIndex ? location.state.exerciseIndex : 0
  );
  const navigate = useNavigate();

  const percent = Math.round((selectedExercise / exercises.length) * 100);
  let percentwidth = percent + "%";
  if (percent === 0) {
    percentwidth = "3%";
  }

  console.log("Exercises are (from EX Page) : ", exercises);

  const title =
    "تمرین های سطح " + exercises[0].level + "  و درس" + exercises[0].unit;

  return (
    <>
      <LimitedNavBar title={title} />
      <div className="navbar justify-content-center">
        <h1>{exercises[selectedExercise].title}</h1>
      </div>
      {exercises &&
        exercises.map(
          (ex, i) =>
            i === selectedExercise && (
              <AnswerQsComponent allQuestions={ex.questions} qType={ex.type} />
            )
        )}

      <div className="fixed-bottom mt-auto py-3 bg-light">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <Buttons
                allItems={exercises}
                itemType="exercise"
                selectedItem={selectedExercise}
                setSelectedItem={setSelectedExercise}
              />
              <hr />
              <div className="w-100 btn-group">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  submit all exercises and go back to level 1 page
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primary clearfix" style={{ width: percentwidth }}>
          <div className="float-end text-white">{percent}%</div>
        </div>
      </div>
    </>
  );
}
