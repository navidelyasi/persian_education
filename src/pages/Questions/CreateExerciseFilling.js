import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import FillingTextQList from "../../components/questions/filling-text/question/FillingTextQList";
import FillingTextQ from "../../components/questions/filling-text/question/FillingTextQ";
import { insertExercise } from "../../services/firebaseServices";
let count = 0;
export default function CreateExerciseFilling() {
  const navigate = useNavigate();
  const location = useLocation();
  const level = location.state.level;
  const unit = location.state.unit;
  const number = location.state.number;
  const title =
    ".ساختن سوال های جای خالی در متن براس سطح" +
    level +
    " و درس" +
    unit +
    " شماره " +
    number;
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ###########################################################################
  // ###################         submit exercise             ###################
  // ###########################################################################
  const submitExercise = async () => {
    setIsLoading(true);
    const exercise = {
      level,
      unit,
      number,
      type: "filling-text",
      title: "forth exercise title and again it can be too long",
      questions,
    };
    console.log("exercise is ", exercise);
    const r = await insertExercise(exercise);
    console.log("exercise submited by id  ", r);
    setIsLoading(false);

    navigate("/");
  };

  // ###########################################################################
  // ###################         handle Delete               ###################
  // ###########################################################################
  const handleDelete = (docId) => {
    setIsLoading(true);
    setQuestions(
      questions.filter((val) => {
        return val.docId !== docId;
      })
    );
    setIsLoading(false);
  };

  // ###########################################################################
  // ###################         handle Edit                 ###################
  // ###########################################################################
  const handleEdit = (docId) => {
    if (docId === 0) {
      setSelectedQuestion({
        docId: 0,
        title: "",
        body: "",
      });
    } else {
      setSelectedQuestion(
        questions.filter((val) => {
          return val.docId === docId;
        })[0]
      );
    }
  };
  console.log("questions are : ", questions);
  const handleChangeInQuestions = async (question) => {
    setIsLoading(true);
    // ###########################################################################
    // ################### it is a new Question into the list? ###################
    // ###########################################################################
    if (question.docId === 0) {
      count++;
      const newQuestion = {
        ...question,
        docId: count,
      };
      console.log("new question is : ", newQuestion);
      setQuestions(questions.concat([newQuestion]));
    } else {
      // ###########################################################################
      // ################### or, it is an edit question in the list? ###############
      // ###########################################################################
      const questionIndex = questions.findIndex((val) => {
        return val.docId === question.docId;
      });
      console.log("quesion is : ", questions[questionIndex]);
      questions[questionIndex].title = question.title;
      questions[questionIndex].body = question.body;
      setQuestions(questions);
    }

    setSelectedQuestion(null);
    setIsLoading(false);
  };

  // ###########################################################################
  // ############################### return ####################################
  // ###########################################################################

  return (
    <>
      <NavBar />
      <nav className="navbar bg-secondary text-white justify-content-center">
        <h2>{title}</h2>
      </nav>
      <hr />
      <br />
      {isLoading ? (
        <h1>Loading . . .</h1>
      ) : (
        <>
          {selectedQuestion === null || undefined ? (
            <>
              <FillingTextQList
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                questions={questions}
              />
              <div className="fixed-bottom m-3">
                <button
                  className="btn btn-lg btn-primary"
                  onClick={submitExercise}
                >
                  Submit all
                </button>
              </div>
            </>
          ) : (
            <FillingTextQ
              handleChangeInQuestions={handleChangeInQuestions}
              question={selectedQuestion}
            />
          )}
        </>
      )}
    </>
  );
}
