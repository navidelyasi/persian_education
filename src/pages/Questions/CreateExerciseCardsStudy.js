import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import MultiChoiceQ from "../../components/questions/multi-choice/MultiChoiceQ";
import MultiChoiceQList from "../../components/questions/multi-choice/MultiChoiceQList";
import { insertExercise } from "../../services/firebaseServices";
let counter = 0;

export default function CreateExerciseCardsStudy() {
  const location = useLocation();
  const navigate = useNavigate();
  const level = location.state.level;
  const unit = location.state.unit;
  const number = location.state.number;

  const title =
    ". ساختن کارت های آموزش لغت برای سطح " +
    level +
    " و درس " +
    unit +
    " شماره " +
    number;
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");

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
      type: "drag-drop-text",
      title: "جملات را تکمیل کنید",
      questions,
    };
    console.log("exercise is ", exercise);
    const r = await insertExercise(exercise);
    console.log("exercise submited by id  ", r);
    setIsLoading(false);

    navigate("/");
  };
  // ###########################################################################
  // ############################### handle add card #######################
  // ###########################################################################
  const handleAddCard = (event) => {
    event.preventDefault();
    let _q = questions;
    _q.push({ name1, name2 });
    console.log("questions are : ", _q);
    setQuestions(_q);
    setName1("");
    setName2("");
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
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-1 row-cols.md-2 row-cols-lg-auto g-4">
            {questions.map((q, i) => (
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h1>{q.name1}</h1>
                    <h2>{q.name2}</h2>
                  </div>
                </div>
              </div>
            ))}

            <div className="col">
              <div className="card">
                <div className="card-body">
                  <form method="POST" onSubmit={handleAddCard}>
                    <div className="mb-3">
                      <label className="form-label">name 1</label>
                      <input
                        type="text"
                        placeholder="name 1"
                        className="form-control"
                        onChange={({ target }) => setName1(target.value)}
                        value={name1}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">name 2</label>
                      <input
                        type="text"
                        placeholder="name 2"
                        className="form-control"
                        onChange={({ target }) => setName2(target.value)}
                        value={name2}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      add card
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="fixed-bottom m-3">
              <button
                className="btn btn-lg btn-primary"
                onClick={submitExercise}
              >
                Submit all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
