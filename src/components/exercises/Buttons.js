import React from "react";
import notification2 from "../../sounds/notification-2-125763.mp3";
import click4 from "../../sounds/click-button-menu-147349.mp3";
import dynamo from "../../sounds/dynamo-163602.mp3";

export default function Buttons({
  allItems,
  itemType,
  selectedItem,
  setSelectedItem,
  handleHelp,
  handleSubmit,
}) {
  const numQs = allItems.length;

  function playnotification2() {
    new Audio(click4).play();
  }

  function playdynamo() {
    new Audio(dynamo).play();
  }

  return (
    <>
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
            previous {itemType}
          </button>

          <button className="btn btn-outline-success" onClick={handleSubmit}>
            submit
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
            next {itemType}
          </button>
        </div>
      )}
    </>
  );
}
