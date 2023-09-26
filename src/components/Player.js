import React, { useRef } from "react";
import musicIcon from "../icons/file-music.svg";
import pause from "../icons/pause-circle.svg";
import play from "../icons/play-circle.svg";
import back from "../icons/skip-start.svg";
import next from "../icons/skip-end.svg";
import sec15for from "../icons/sec_15_forward.svg";
import sec15back from "../icons/sec_15_backward.svg";
import sec30for from "../icons/sec_30_forward.svg";
import sec30back from "../icons/sec_30_backward.svg";

import "./player.css";

export default function Player({
  audioElement,
  isPlaying,
  setIsPlaying,
  currentSong,
  setCurrentSong,
}) {
  const clickRef = useRef();

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    audioElement.current.currentTime = (divprogress / 100) * currentSong.length;
  };

  return (
    <div className="container">
      <div className="player_container">
        <div className="navigation">
          <div className="d-flex justify-content-center">
            <div className="btn-group">
              <button className="btn">
                <img
                  src={musicIcon}
                  alt="music"
                  style={{ width: "50px", height: "50px" }}
                />
              </button>
              <button className="btn">
                <img
                  src={back}
                  alt="back"
                  style={{ width: "50px", height: "50px" }}
                />
              </button>
              <button
                className="btn"
                onClick={() => {
                  const _a = audioElement.current.currentTime;
                  if (_a > 30) {
                    audioElement.current.currentTime = _a - 30;
                  }
                }}
              >
                <img
                  src={sec30back}
                  alt="back30sec"
                  style={{ width: "50px", height: "50px" }}
                />
              </button>
              <button
                className="btn"
                onClick={() => {
                  const _a = audioElement.current.currentTime;
                  if (_a > 15) {
                    audioElement.current.currentTime = _a - 15;
                  }
                }}
              >
                <img
                  src={sec15back}
                  alt="back15sec"
                  style={{ width: "50px", height: "50px" }}
                />
              </button>
              <button className="btn" onClick={playPause}>
                {isPlaying ? (
                  <img
                    src={pause}
                    alt="pause"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  <img
                    src={play}
                    alt="play"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </button>
              <button
                className="btn"
                onClick={() => {
                  const _a = audioElement.current.currentTime;
                  if (audioElement.current.duration - _a > 15) {
                    audioElement.current.currentTime = _a + 15;
                  }
                }}
              >
                <img
                  src={sec15for}
                  alt="forward15sec"
                  style={{ width: "50px", height: "50px" }}
                />
              </button>
              <button
                className="btn"
                onClick={() => {
                  const _a = audioElement.current.currentTime;
                  if (audioElement.current.duration - _a > 30) {
                    audioElement.current.currentTime = _a + 30;
                  }
                }}
              >
                <img
                  src={sec30for}
                  alt="forward30sec"
                  style={{ width: "50px", height: "50px" }}
                />
              </button>
              <button className="btn">
                <img
                  src={next}
                  alt="next"
                  style={{ width: "50px", height: "50px" }}
                />
              </button>
              <button className="btn">
                <img
                  src={musicIcon}
                  alt="music"
                  style={{ width: "50px", height: "50px" }}
                />
              </button>
            </div>
          </div>
          <div
            className="bg-light navigation_wrapper"
            onClick={checkWidth}
            ref={clickRef}
          >
            <div
              className="bg-primary seek_bar"
              style={{ width: `${currentSong.progress + "%"}` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
