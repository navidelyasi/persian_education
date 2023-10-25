import React, { useState, useRef, useEffect } from "react";
import BodyFillingText from "../questions/filling-text/answer/BodyFillingText";
import BodyListening from "../questions/listening/BodyListening";
import BodyMultiChoice from "../questions/multi-choice/answer/BodyMultiChoice";
import CardsStudy from "../questions/cards/CardsStudy";
import CardsAnswer from "../questions/cards/CardsAnswer";
import DragDropText from "../questions/drag-drop/DragDropText";
import { doSubmitQAnswer } from "../../hooks/handle-questions";

export default function AnswerQsComponent({ allQuestions, qType }) {
  const [questions, setQuestions] = useState(allQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const nextQuestionTimeoutRef = useRef(null);

  // #########################################################################
  // ##################          handle help              ####################
  // #########################################################################
  const handleHelp = () => {
    if (qType === "filling-text") {
      let _questions = [...questions];
      _questions[selectedQuestion].helped =
        !_questions[selectedQuestion].helped;
      setQuestions(_questions);
    } else if (qType === "multi-choice") {
      console.log("handle help od selected is : ", selectedQuestion);
    }
  };

  // #########################################################################
  // ##################          handle submit              ##################
  // #########################################################################
  const handleSubmit = () => {
    setQuestions(doSubmitQAnswer(questions, selectedQuestion, qType));

    // Clear any previous timeouts
    if (nextQuestionTimeoutRef.current) {
      clearTimeout(nextQuestionTimeoutRef.current);
    }

    // Set a timeout to increment selectedQuestion after # second
    nextQuestionTimeoutRef.current = setTimeout(() => {
      if (selectedQuestion === questions.length - 1) {
        setSelectedQuestion(0);
      } else {
        setSelectedQuestion(selectedQuestion + 1);
      }
    }, 2000);
  };

  // #########################################################################
  // ##################          handle change              ##################
  // #########################################################################
  const handleChange = (questionIndex, lineIndex, strIndex, event) => {
    let _questions = [...questions];
    _questions[questionIndex].answers[lineIndex][strIndex] = event.target.value;
    setQuestions(_questions);
  };

  // #########################################################################
  // ##################              use Effect               ################
  // #########################################################################
  useEffect(() => {
    if (questions.length > 1) {
      let qsIds = [];
      questions.forEach((q) => qsIds.push(q.docId));
    }
  }, []);

  // #########################################################################
  // ##################              return               ####################
  // #########################################################################
  return (
    <>
      {qType === "cards-study" && <CardsStudy questions={questions} />}
      {qType === "drag-drop-text" && (
        <DragDropText
          questions={questions}
          setQuestions={setQuestions}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          handleHelp={handleHelp}
          handleSubmit={handleSubmit}
        />
      )}
      {qType === "multi-choice" && (
        <BodyMultiChoice
          questions={questions}
          setQuestions={setQuestions}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          handleHelp={handleHelp}
          handleSubmit={handleSubmit}
        />
      )}
      {qType === "filling-text" && (
        <BodyFillingText
          questions={questions}
          selectedQuestion={selectedQuestion}
          handleChange={handleChange}
          setSelectedQuestion={setSelectedQuestion}
          handleHelp={handleHelp}
          handleSubmit={handleSubmit}
        />
      )}
      {qType === "listening" && (
        <BodyListening
          questions={questions}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
      {qType === "cards-answer" && (
        <CardsAnswer
          questions={questions}
          setQuestions={setQuestions}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </>
  );
}
