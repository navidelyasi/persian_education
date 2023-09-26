import React from "react";

export default function ButtonSubmitAll({ questions, handleSubmitAll }) {
  let result = "";
  let score = "";

  // #########################################################################
  // ##################              on submit all        ####################
  // #########################################################################
  const onSubmitAll = () => {
    let _result = [];
    let score = 0;
    let scoreAll = 0;
    let unsubmitted = 0;

    questions.forEach((question) => {
      _result = _result.concat(question.result);

      if (question.result.startsWith("-")) {
        scoreAll = scoreAll + parseInt(question.result.slice(1).split("-")[1]);
        unsubmitted++;
      } else {
        let r = question.result.split("-");
        score = score + parseInt(r[0]);
        scoreAll = scoreAll + parseInt(r[1]);
      }
    });
    const text = `your score : ${score} / ${scoreAll}.(${Math.round(
      (score / scoreAll) * 100
    )}%)\nyou have ${unsubmitted} unsubmitted questions\ndo you still want to submit all answers?`;

    handleSubmitAll(_result, score + "-" + scoreAll, text);
  };

  // #########################################################################
  // ##################              handle Submit all              ##########
  // #########################################################################
  const handleSubmitAll = (_result, _score, text) => {
    result = _result;
    score = _score;
    setAlert({ alert: true, message: text });
    console.log("done :) ");
  };

  // #########################################################################
  // ############  goes and comes back from an alert message          ########
  // #########################################################################
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
  // ##################              return               ####################
  // #########################################################################
  return (
    <button onClick={() => onSubmitAll()} className="btn btn-success">
      submit all answers and go back to home
    </button>
  );
}
