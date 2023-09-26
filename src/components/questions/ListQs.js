import React from "react";

export default function ListQs({
  questions,
  selectedQuestion,
  setSelectedQuestion,
}) {
  return (
    <>
      <div>Questions / scores</div>
      {questions.length > 0 && (
        <div className="btn-group-vertical">
          {questions.map((val, i) => (
            <div className="btn-group">
              <button
                key={"question_" + i}
                className={
                  i === selectedQuestion
                    ? "btn btn-sm btn-outline-primary active"
                    : "btn btn-sm btn-outline-primary"
                }
                onClick={() => setSelectedQuestion(i)}
              >
                Question : {i + 1}
              </button>

              <button
                disabled
                key={"score_" + i}
                className="btn btn-sm btn-outline-primary"
              >
                {val.submitted ? val.result : <>-</>}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
