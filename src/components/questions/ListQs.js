import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { show1style } from "../../data/constants/styles";
import { exerciseStore } from "../../database/exercise-store";

export default function ListQs() {
  const { data, index, qindex, setQIndex } = exerciseStore();
  const questions = data[index].questions;

  const show1 = useSpring(show1style);

  return (
    <animated.div style={show1}>
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
              <tr key={i} className={i === qindex ? "table-primary" : ""}>
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
                    Question : {i + 1}
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
    </animated.div>
  );
}
