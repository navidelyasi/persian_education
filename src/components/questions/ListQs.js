import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { show1style } from "../../data/constants/styles";
import { exerciseStore } from "../../database/exercise-store";
import "./ListQs.css";

export default function ListQs() {
  const { data, index, qindex, setQIndex } = exerciseStore();
  const questions = data[index].questions;

  const show1 = useSpring(show1style);

  return (
    <animated.div style={show1}>
      <label className="hamburger-menu">
        <input type="checkbox"></input>
      </label>
      <aside className="sidebar">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Questions</th>
              <th scope="col">score</th>
            </tr>
          </thead>
          <tbody>
            {questions.length > 0 &&
              questions.map((val, i) => (
                <tr
                  key={i}
                  className={
                    val.submitted
                      ? val.result === 1
                        ? "table-success"
                        : "table-danger"
                      : i === qindex
                      ? "table-primary"
                      : "table-secondary"
                  }
                >
                  <td>
                    <button
                      key={"question_" + i}
                      className={
                        i === qindex
                          ? "btn btn-sm btn-outline-primary active"
                          : "btn btn-sm btn-outline-primary"
                      }
                      onClick={() => setQIndex(i)}
                    >
                      Q : {i + 1}
                    </button>
                  </td>
                  <td>
                    <button
                      disabled
                      key={"score_" + i}
                      className="btn btn-sm btn-outline-primary"
                    >
                      {val.submitted ? val.result : <>-</>}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </aside>
    </animated.div>
  );
}
