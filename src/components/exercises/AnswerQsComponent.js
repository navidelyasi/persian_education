import React from "react";
import BodyFillingText from "../questions/filling-text/answer/BodyFillingText";
import BodyListening from "../questions/listening/BodyListening";
import BodyMultiChoice from "../questions/multi-choice/answer/BodyMultiChoice";
import CardsStudy from "../questions/cards/CardsStudy";
import CardsAnswer from "../questions/cards/CardsAnswer";
import DragDropText from "../questions/drag-drop/DragDropText";
import { exerciseStore } from "../../database/exercise-store";

export default function AnswerQsComponent() {
  const { data, index } = exerciseStore();

  return (
    <>
      {data[index].type === "cards-study" && <CardsStudy />}
      {data[index].type === "cards-answer" && <CardsAnswer />}
      {data[index].type === "multi-choice" && <BodyMultiChoice />}
      {data[index].type === "drag-drop-text" && <DragDropText />}
      {data[index].type === "filling-text" && <BodyFillingText />}
      {data[index].type === "listening" && <BodyListening />}
    </>
  );
}
