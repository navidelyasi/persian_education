import React, { useState, useRef, useEffect, useContext } from "react";
import BodyFillingText from "../questions/filling-text/answer/BodyFillingText";
import BodyMultiChoice from "../questions/multi-choice/answer/BodyMultiChoice";
import UserContext from "../../context/user";
import { useNavigate } from "react-router-dom";
import AlertSubmit from "../AlertSubmit";
import Buttons from "../exercises/Buttons";
import ListQs from "../questions/ListQs";
import { doSubmitQAnswer } from "../../hooks/handle-questions";

export default function AnswerQsComponent({ allQuestions, qType }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(allQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
  });
  const answerLogId = useRef("");
  const user = useContext(UserContext);
  let result = "";
  let score = "";

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
  // ##################              handle Submit all         ###############
  // #########################################################################
  const handleSubmitAll = (_result, _score, text) => {
    result = _result;
    score = _score;
    setAlert({ alert: true, message: text });
    console.log("done :) ");
  };

  const handleResponse = (r) => {
    if (r === "yes") {
      console.log("user says yes");
      navigate("/");
      // updateAnswerLog(answerLogId.current, result, score);
    } else {
      console.log("user says no");
    }
    setAlert({ alert: false, message: "" });
  };

  // #########################################################################
  // ##################              use Effect               ################
  // #########################################################################
  useEffect(() => {
    if (questions.length > 1) {
      let qsIds = [];
      questions.forEach((q) => qsIds.push(q.docId));
      // insertNewAnswerLog(
      //   user.uid,
      //   questions[0].level + "-" + questions[0].unit,
      //   "filling-text",
      //   qsIds
      // ).then((r) => (answerLogId.current = r));
    }
  }, []);

  // #########################################################################
  // ##################              return               ####################
  // #########################################################################
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <ListQs
              questions={questions}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
            />
          </div>
          <div className="col-10">
            {qType === "multi-choice" ? (
              <BodyMultiChoice
                questions={questions}
                setQuestions={setQuestions}
                selectedQuestion={selectedQuestion}
              />
            ) : (
              <BodyFillingText
                question={questions[selectedQuestion]}
                questionIndex={selectedQuestion}
                handleChange={handleChange}
              />
            )}
            <div className="m-3">
              <div className="container">
                <Buttons
                  allItems={questions}
                  itemType="question"
                  selectedItem={selectedQuestion}
                  setSelectedItem={setSelectedQuestion}
                  handleHelp={handleHelp}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {alert.alert && (
        <AlertSubmit message={alert.message} handleResponse={handleResponse} />
      )}
    </>
  );
}