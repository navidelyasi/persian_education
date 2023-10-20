import React from "react";
import click4 from "../../sounds/click-button-menu-147349.mp3";
import dynamo from "../../sounds/dynamo-163602.mp3";
import { animated, useSpring } from "@react-spring/web";
import { show1style, show2style } from "../../constants/styles";
import back from "../../icons/skip-start.svg";
import next from "../../icons/skip-end.svg";
import {
  playnotification2,
  playdynamo,
} from "../../hooks/handle-sound-effects";

export default function Buttons({
  allItems,
  itemType,
  selectedItem,
  setSelectedItem,
  handleHelp,
  handleSubmit,
}) {
  const numQs = allItems.length;

  const show1 = useSpring(show1style);

  return (
    <animated.div style={show1}>
      {allItems.length > 0 && (
        <div
          className={
            itemType === "question"
              ? "w-75 btn-group btn-group-sm mx-auto"
              : "w-100 btn-group"
          }
        >
          <button
            className={
              selectedItem > 0
                ? "btn btn-outline-primary"
                : "btn btn-outline-primary disabled"
            }
            onClick={() => {
              playnotification2();
              setSelectedItem(selectedItem - 1);
            }}
          >
            <img
              src={back}
              alt="back"
              style={
                itemType === "exercise"
                  ? { width: "50px", height: "50px", color: "white" }
                  : { width: "30px", height: "30px", color: "white" }
              }
            />
            {itemType === "exercise" && "previous exercise"}
          </button>

          <button
            className="btn btn-outline-success"
            onClick={() => {
              if (!allItems[selectedItem].submitted) {
                handleSubmit();
              }
            }}
          >
            submit {itemType}
          </button>

          {handleHelp && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                playdynamo();
                handleHelp();
              }}
            >
              help
            </button>
          )}
          <button
            className={
              selectedItem < numQs - 1
                ? "btn btn-outline-primary"
                : "btn btn-outline-primary disabled"
            }
            onClick={() => {
              playnotification2();
              setSelectedItem(selectedItem + 1);
            }}
          >
            <img
              src={next}
              alt="next"
              style={
                itemType === "exercise"
                  ? { width: "50px", height: "50px", color: "blue" }
                  : { width: "30px", height: "30px", color: "blue" }
              }
            />
            {itemType === "exercise" && "next exercise"}
          </button>
        </div>
      )}
    </animated.div>
  );
}
