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
      {qType === "cards-answer" && (
        <CardsAnswer
          questions={questions}
          setQuestions={setQuestions}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
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
    </>
  );
}

// ____   __ _ __ _ _ __ _ _   backup for special question

export default function BodyFillingText({
  questions,
  selectedQuestion,
  handleChange,
  setSelectedQuestion,
  handleHelp,
  handleSubmit,
}) {
  const show2 = useSpring(show2style);
  const [show3, apishow3] = useSpring(() => {});

  if (questions[selectedQuestion].helped) {
    apishow3.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 1000 },
    });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2 opacity-75">
            <ListQs
              questions={questions}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
            />
          </div>
          <div className="col-10 shadow p-3 mb-5 bg-body rounded">
            {questions && (
              <div className="card" key={questions[selectedQuestion].docId}>
                <animated.div style={show2}>
                  <div className="card-body">
                    <div className="clearfix">
                      <h1 className="float-end">
                        {questions[selectedQuestion].title}
                      </h1>
                    </div>
                    {questions &&
                      questions[selectedQuestion].body.map(
                        (line, lineIndex) => (
                          <div
                            key={
                              questions[selectedQuestion].docId +
                              "-" +
                              lineIndex
                            }
                            // className="d-flex p-2 g-2"
                            className="d-flex flex-row-reverse"
                            style={{ gap: "10px" }}
                          >
                            {line.map((str, strIndex) =>
                              strIndex % 2 ? (
                                <input
                                  key={
                                    questions[selectedQuestion].docId +
                                    "-" +
                                    lineIndex +
                                    "-" +
                                    strIndex
                                  }
                                  type="text"
                                  size={str.length + 2}
                                  className={
                                    questions[selectedQuestion].submitted &&
                                    (str ===
                                    questions[selectedQuestion].answers[
                                      lineIndex
                                    ][strIndex]
                                      ? "bg-success"
                                      : "bg-danger")
                                  }
                                  autocomplete="off"
                                  name={
                                    questions[selectedQuestion].docId +
                                    "-" +
                                    lineIndex +
                                    "-" +
                                    strIndex
                                  }
                                  value={
                                    questions[selectedQuestion].answers[
                                      lineIndex
                                    ][strIndex]
                                  }
                                  onChange={(event) =>
                                    handleChange(
                                      selectedQuestion,
                                      lineIndex,
                                      strIndex,
                                      event
                                    )
                                  }
                                />
                              ) : (
                                <p>{str}</p>
                              )
                            )}
                            {questions[selectedQuestion].helped &&
                              questions[selectedQuestion].answers[lineIndex]
                                .length > 1 &&
                              questions[selectedQuestion].answers[
                                lineIndex
                              ].map((str, strIndex) =>
                                strIndex % 2 ? null : (
                                  <animated.div style={show3}>
                                    <div
                                      key={uuidv4()}
                                      className="btn btn-secondary"
                                    >
                                      {str}
                                    </div>
                                  </animated.div>
                                )
                              )}
                          </div>
                        )
                      )}
                  </div>
                </animated.div>
              </div>
            )}
            <br />
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
    </>
  );
}
