import React, { useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { shuffle } from "../../../hooks/prepare-qs-for-answering";
import { animated, useSpring } from "@react-spring/web";
import { show2style, show1style } from "../../../data/constants/styles";
import Swal from "sweetalert2";
import {
  playbrightnotification,
  playinterface12,
  playwronganswer,
} from "../../../hooks/handle-sound-effects";
import { exerciseStore } from "../../../database/exercise-store";

export default function DragDropText() {
  const { data, index, setExercises, dragableItems, setDragableItems } =
    exerciseStore();
  const questions = data[index].questions;
  const nextQuestionTimeoutRef = useRef(null);

  function handleDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(dragableItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDragableItems(items);
  }

  const checkAnswers = () => {
    let _q = [...questions];
    _q.map((q, i) => {
      q.submitted = true;
      if (q.name2 === dragableItems[i].name2) {
        q.score = 1;
      } else {
        q.score = 0;
      }
    });
    let _exercises = data;
    _exercises[index].questions = _q;
    setExercises(_exercises);

    playinterface12();
    if (nextQuestionTimeoutRef.current) {
      clearTimeout(nextQuestionTimeoutRef.current);
    }
    nextQuestionTimeoutRef.current = setTimeout(() => {
      let score = 0;
      _q.map((q) => {
        if (q.score > 0) {
          score++;
        }
      });

      if (score / _q.length > 0.51) {
        playbrightnotification();
        Swal.fire("Good job!", "You answered most of them correctly");
      } else {
        playwronganswer();
        Swal.fire("No", "You should try again");
      }
    }, 1500);
  };

  useEffect(() => {
    let _data = [...data];
    _data[index].questions.map((q) => {
      q.submitted = false;
    });
    setExercises(_data);
    let _q = [...questions];
    _q = shuffle(_q);
    setDragableItems(_q);
  }, []);

  const show1 = useSpring(show1style);
  const show2 = useSpring(show2style);

  return (
    <div className="container">
      <div className="row">
        <h3 className="text-primary">
          drag and drop this colomn to right order
        </h3>
        {/*  ------      col 1      ---------     */}
        <div className="col">
          <animated.div style={show2}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="list1">
                {(provided) => (
                  <table
                    className="table"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <tbody>
                      {dragableItems.length > 0 &&
                        dragableItems.map((item, index) => {
                          return (
                            <Draggable
                              key={item.name2}
                              draggableId={item.name2}
                              index={index}
                            >
                              {(provided) => (
                                <tr
                                  className="card"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div
                                    className={
                                      !item.submitted
                                        ? "card-body table-primary"
                                        : item.score > 0
                                        ? "card-body table-success"
                                        : "card-body table-danger"
                                    }
                                  >
                                    <td className="navbar justify-content-center">
                                      <h3>{item.name2}</h3>
                                    </td>
                                  </div>
                                </tr>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </tbody>
                  </table>
                )}
              </Droppable>
            </DragDropContext>
          </animated.div>
        </div>

        {/*  ------      col 2      ---------     */}
        <div className="col">
          <animated.div style={show1}>
            <table className="table">
              <tbody>
                {questions.map((item, i) => (
                  <tr className="card" key={item.name1}>
                    <div
                      className={
                        !item.submitted
                          ? "card-body"
                          : item.score > 0
                          ? "card-body table-success"
                          : "card-body table-danger"
                      }
                    >
                      <td className="navbar justify-content-center">
                        <h3>{item.name1}</h3>
                      </td>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </animated.div>
        </div>
        <div className="row">
          <button className="btn btn-outline-success" onClick={checkAnswers}>
            check answers
          </button>
        </div>
      </div>
    </div>
  );
}
