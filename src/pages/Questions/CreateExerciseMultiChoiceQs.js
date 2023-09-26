import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import MultiChoiceQ from "../../components/questions/multi-choice/MultiChoiceQ";
import MultiChoiceQList from "../../components/questions/multi-choice/MultiChoiceQList";
import { insertExercise } from "../../services/firebaseServices";
let counter = 0;

export default function CreateExerciseMultiChoiceQs() {
  const location = useLocation();
  const navigate = useNavigate();
  const level = location.state.level;
  const unit = location.state.unit;
  const number = location.state.number;

  const title =
    ". ساختن سوال های چند گزینه ای برای سطح " +
    level +
    " و درس " +
    unit +
    " شماره " +
    number;
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Questions are : ", questions);
  // ###########################################################################
  // ###################         submit exercise                ################
  // ###########################################################################
  const submitExercise = async () => {
    setIsLoading(true);
    const exercise = {
      level,
      unit,
      number,
      type: "multi-choice",
      title: "first exercise ever",
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
  const handleDelete = async (docId) => {
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
        choices: [],
        correct: -1,
      });
    } else {
      setSelectedQuestion(
        questions.filter((val) => {
          return val.docId === docId;
        })[0]
      );
    }
  };

  const handleChangeInQuestions = async (question) => {
    setIsLoading(true);
    // ###########################################################################
    // ################### it is a new Question into the list? ###################
    // ###########################################################################
    if (question.docId === 0) {
      counter++;
      question.docId = counter;
      setQuestions(questions.concat([question]));
    } else {
      // ###########################################################################
      // ################### or, it is an edit question in the list? ###############
      // ###########################################################################
      const questionIndex = questions.findIndex((val) => {
        return val.docId === question.docId;
      });
      questions[questionIndex].title = question.title;
      questions[questionIndex].choices = question.choices;
      questions[questionIndex].correct = question.correct;
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
      {isLoading ? (
        <h1>Loading . . .</h1>
      ) : (
        <>
          {selectedQuestion === null || undefined ? (
            /* // ################################################################## */
            /* // ################### going to show all  question ##################  */
            /* // ################################################################## */
            <>
              <MultiChoiceQList
                questions={questions}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
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
            /* // ################################################################## */
            /* // ################### going to show one  question ##################  */
            /* // ################################################################## */
            <MultiChoiceQ
              question={selectedQuestion}
              handleChangeInQuestions={handleChangeInQuestions}
            />
          )}
        </>
      )}
    </>
  );
}
