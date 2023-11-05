import React from "react";
import { useNavigate } from "react-router-dom";
import { exerciseStore } from "../../database/exercise-store";
import { playnotification2 } from "../../hooks/handle-sound-effects";
import back from "../../data/icons/skip-start.svg";
import next from "../../data/icons/skip-end.svg";

function ButtonsExercises() {
  const navigate = useNavigate();
  const { data, index, setIndex } = exerciseStore();

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="w-100 btn-group">
            <button
              className={
                index > 0
                  ? "btn btn-outline-primary"
                  : "btn btn-outline-primary disabled"
              }
              onClick={() => {
                playnotification2();
                setIndex(index - 1);
              }}
            >
              <img
                src={back}
                alt="back"
                style={{ width: "30px", height: "30px", color: "white" }}
              />
              back
            </button>

            <button
              className="btn btn-success"
              onClick={() => {
                navigate("/");
              }}
            >
              submit all exercises and go back to level 1 page
            </button>

            <button
              className={
                index < data.length - 1
                  ? "btn btn-outline-primary"
                  : "btn btn-outline-primary disabled"
              }
              onClick={() => {
                playnotification2();
                setIndex(index + 1);
              }}
            >
              next
              <img
                src={next}
                alt="next"
                style={{ width: "30px", height: "30px", color: "blue" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonsExercises;
