import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { show2style } from "../../../data/constants/styles";
import Buttons from "../../exercises/Buttons";
import ListQs from "../ListQs";
import rainbow from "../../../data/musics/Rainbow.mp3";
import shoulders from "../../../data/musics/Shoulders.mp3";
import Player from "../../general/Player";
import { exerciseStore } from "../../../database/exercise-store";

export default function BodyListening() {
  const { data, index, qindex, setQIndex } = exerciseStore();
  const questions = data[index].questions;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({});
  const audioElement = useRef();

  const onPlaying = () => {
    const duration = audioElement.current.duration;
    const currentTime = audioElement.current.currentTime;
    setCurrentSong({
      progress: (currentTime / duration) * 100,
      length: duration,
    });
  };

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  }, [isPlaying]);

  const show2 = useSpring(show2style);
  const [show3, apishow3] = useSpring(() => {});

  var songSource = "";
  if (questions.length > 0) {
    songSource = questions[qindex].song === "Rainbow" ? rainbow : shoulders;
    if (questions[qindex].helped) {
      apishow3.start({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },
      });
    }
  }

  return (
    <>
      <audio src={songSource} ref={audioElement} onTimeUpdate={onPlaying} />
      <div className="container">
        <div className="row">
          <div className="col-2 opacity-75">
            <ListQs
              questions={questions}
              selectedQuestion={qindex}
              setSelectedQuestion={setQIndex}
            />
          </div>
          <div className="col-10 shadow p-3 mb-5 bg-body rounded">
            <div className="card" key={questions[qindex].docId}>
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
              <animated.div style={show2}>
                <div className="card-body">
                  <div className="clearfix">
                    <h1 className="float-end">{questions[qindex].title}</h1>
                  </div>
                  {questions[qindex].body.map((line, lineIndex) => (
                    <div
                      key={questions[qindex].docId + "-" + lineIndex}
                      className="d-flex flex-row-reverse"
                      style={{ gap: "10px" }}
                    >
                      <p>{line}</p>
                    </div>
                  ))}
                </div>
              </animated.div>
            </div>

            <br />
            <Buttons
              allItems={questions}
              itemType="question"
              selectedItem={qindex}
              setSelectedItem={setQIndex}
            />
          </div>
        </div>
      </div>
    </>
  );
}
