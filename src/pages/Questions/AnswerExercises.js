import React from "react";
import { useNavigate } from "react-router-dom";
import { exerciseStore } from "../../database/exercise-store";
import LimitedNavBar from "../../components/general/LimitedNavBar";
import AnswerQsComponent from "../../components/exercises/AnswerQsComponent";
import ButtonsExercises from "../../components/exercises/ButtonsExercises";

export default function AnswerExercises() {
  const { data, index } = exerciseStore();

  const percent = Math.round((index / data.length) * 100);
  let percentwidth = percent + "%";
  if (percent === 0) {
    percentwidth = "3%";
  }

  const title = "تمرین های سطح " + data[0].level + "  و درس" + data[0].unit;

  return (
    <>
      <LimitedNavBar title={title} />
      <div className="navbar justify-content-center">
        <h1 style={{ color: "blue" }}>
          {data[index].number} __ {data[index].title}
        </h1>
      </div>
      <AnswerQsComponent />

      <div className="fixed-bottom mt-auto py-3 bg-light">
        <ButtonsExercises />
        <div className="bg-primary clearfix" style={{ width: percentwidth }}>
          <div className="float-end text-white">{percent}%</div>
        </div>
      </div>
    </>
  );
}
