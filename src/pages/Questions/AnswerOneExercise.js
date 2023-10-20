import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LimitedNavBar from "../../components/LimitedNavBar";
import { useLocation } from "react-router-dom";
import Buttons from "../../components/exercises/Buttons";
import AnswerQsComponent from "../../components/exercises/AnswerQsComponent";

export default function AnswerOneExercise() {
  const location = useLocation();
  const exercise = location.state.exercise;
  const navigate = useNavigate();

  // console.log("One Exercise  (from one EX Page) : ", exercise);

  const title = "تمرین های سطح " + exercise.level + "  و درس" + exercise.unit;

  return (
    <>
      <LimitedNavBar title={title} />
      <div className="navbar justify-content-center">
        <h1>{exercise.title}</h1>
      </div>
      {exercise && (
        <AnswerQsComponent
          allQuestions={exercise.questions}
          qType={exercise.type}
        />
      )}

      <div className="fixed-bottom mt-auto py-3 bg-light">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="w-100 btn-group">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  submit all exercises and go back to home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
