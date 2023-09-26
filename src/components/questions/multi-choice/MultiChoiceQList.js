import React from "react";

export default function MultiChoiceQList({
  questions,
  handleEdit,
  handleDelete,
}) {
  return (
    <>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-auto g-4">
            {questions.map((question, index) => (
              <>
                <div className="col">
                  <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <div className="card-title">{question.title}</div>
                      <ul className="list-group">
                        {question.choices.map((choice, i) => (
                          <li
                            className={
                              i === question.correct
                                ? "list-group-item active"
                                : "list-group-item"
                            }
                          >
                            {choice}
                          </li>
                        ))}
                      </ul>
                      <br />
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(question.docId)}
                        >
                          Edit Question
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(question.docId)}
                        >
                          Delete Question
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
            <div className="col">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <button
                    className="btn btn-outline-success"
                    onClick={() => {
                      handleEdit(0);
                    }}
                  >
                    Add New Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
