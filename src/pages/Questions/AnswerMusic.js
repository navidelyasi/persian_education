import React, { useEffect, useState, useRef } from "react";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import { getAllExercises } from "../../services/firebaseServices";
import { prepareExercises } from "../../hooks/prepare-qs-for-answering";
import { v4 as uuidv4 } from "uuid";
import Buttons from "../../components/exercises/Buttons";
import { doSubmitQAnswer } from "../../hooks/handle-questions";
import habibi from "../../musics/habibi.mp3";
import Player from "../../components/Player";

export default function AnswerMusic() {
  const [questions, setQuestions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({});
  const [currentHighlightedLine, setcurrentHighlightedLine] = useState(-1);

  const navigate = useNavigate();
  const audioElement = useRef();

  const level = "3";
  const unit = "1";

  // #########################################################################
  // ##################      get all exercises              ##################
  // #########################################################################
  const getExercises = async () => {
    let _exercises = await getAllExercises(level, unit);
    _exercises = prepareExercises(_exercises);
    console.log("all exercises are : ", _exercises[0]);
    setQuestions(_exercises[0].questions);
  };

  // #########################################################################
  // ##################          handle submit              ##################
  // #########################################################################
  const handleSubmit = () => {
    setQuestions(doSubmitQAnswer(questions, 0, "filling-text"));
  };

  // #########################################################################
  // ##################          handle help              ####################
  // #########################################################################
  const handleHelp = () => {
    let _questions = [...questions];
    _questions[0].helped = !_questions[0].helped;
    setQuestions(_questions);
  };

  // #########################################################################
  // ##################          handle change              ##################
  // #########################################################################
  const handleChange = (questionIndex, lineIndex, strIndex, event) => {
    let _questions = [...questions];
    _questions[questionIndex].answers[lineIndex][strIndex] = event.target.value;
    setQuestions(_questions);
  };

  useEffect(() => {
    if (questions === undefined || []) getExercises();
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  }, [isPlaying]);

  console.log("questions are : ", questions);

  const onPlaying = () => {
    const duration = audioElement.current.duration;
    const currentTime = audioElement.current.currentTime;

    // console.log("current is : ", currentTime);

    updatecurrentHighlightedLine(currentTime);

    setCurrentSong({
      progress: (currentTime / duration) * 100,
      length: duration,
    });
  };

  const updatecurrentHighlightedLine = (t) => {
    if (t > 10 && t < 17) {
      setcurrentHighlightedLine(0);
    } else if (t > 17 && t < 19) {
      setcurrentHighlightedLine(1);
    } else if (t > 19 && t < 21) {
      setcurrentHighlightedLine(2);
    } else if (t > 21 && t < 26) {
      setcurrentHighlightedLine(3);
    } else if (t > 26 && t < 32) {
      setcurrentHighlightedLine(4);
    } else if (t > 32 && t < 34) {
      setcurrentHighlightedLine(6);
    } else if (t > 34 && t < 36) {
      setcurrentHighlightedLine(7);
    } else if (t > 36 && t < 39) {
      setcurrentHighlightedLine(8);
    } else {
      setcurrentHighlightedLine(-1);
    }
  };

  const changeSongCurrentTime = (lineIndex) => {
    if (lineIndex === 3) {
      audioElement.current.currentTime = 21;
    } else if (lineIndex === 8) {
      audioElement.current.currentTime = 36;
    }
  };

  return (
    <>
      <NavBar />
      <br /> <hr />
      <audio src={habibi} ref={audioElement} onTimeUpdate={onPlaying} />
      <div className="d-flex justify-content-center">
        <Player
          audioElement={audioElement}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
      </div>
      <br /> <hr />
      {questions.length > 0 && (
        <>
          <div className="container">
            <div className="row">
              <div className="card" key={questions[0].docId}>
                <div className="card-body">
                  <div className="clearfix">
                    <h1 className="float-end">{questions[0].title}</h1>
                  </div>

                  {questions[0].body.map((line, lineIndex) => (
                    <div className="clearfix">
                      <div className="float-end">
                        <div
                          key={questions[0].docId + "-" + lineIndex}
                          className={
                            currentHighlightedLine === lineIndex
                              ? "d-flex flex-row-reverse bg-info"
                              : "d-flex flex-row-reverse"
                          }
                          style={{ gap: "10px" }}
                          onClick={() => changeSongCurrentTime(lineIndex)}
                        >
                          {line.map((str, strIndex) =>
                            strIndex % 2 ? (
                              <input
                                key={
                                  questions[0].docId +
                                  "-" +
                                  lineIndex +
                                  "-" +
                                  strIndex
                                }
                                type="text"
                                size={str.length + 2}
                                className={
                                  questions[0].submitted &&
                                  (str ===
                                  questions[0].answers[lineIndex][strIndex]
                                    ? "bg-success"
                                    : "bg-danger")
                                }
                                autocomplete="off"
                                name={
                                  questions[0].docId +
                                  "-" +
                                  lineIndex +
                                  "-" +
                                  strIndex
                                }
                                value={
                                  questions[0].answers[lineIndex][strIndex]
                                }
                                onChange={(event) =>
                                  handleChange(0, lineIndex, strIndex, event)
                                }
                              />
                            ) : (
                              <p>{str}</p>
                            )
                          )}
                          {questions[0].helped &&
                            questions[0].answers[lineIndex].length > 1 &&
                            questions[0].answers[lineIndex].map(
                              (str, strIndex) =>
                                strIndex % 2 ? null : (
                                  <div
                                    key={uuidv4()}
                                    className="btn btn-secondary"
                                  >
                                    {str}
                                  </div>
                                )
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="m-3">
              <div className="container">
                <Buttons
                  allItems={questions}
                  itemType="question"
                  selectedItem={0}
                  handleHelp={handleHelp}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
