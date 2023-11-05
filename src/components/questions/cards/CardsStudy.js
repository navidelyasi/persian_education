import React, { useState } from "react";
import "../../css/card.css";
import { playinterface12 } from "../../../hooks/handle-sound-effects";
import { exerciseStore } from "../../../database/exercise-store";

export default function CardsStudy() {
  const { data, index } = exerciseStore();
  const questions = data[index].questions;

  const [rotates, setRotates] = useState(questions.map((q) => 0));

  const sources = questions.map((q) =>
    require(`../../../data/icons/unit11/${q.name1}.png`)
  );

  return (
    <div className="container-fluid">
      <div className="row row-cols-1 row-cols-sm-1 row-cols.md-2 row-cols-lg-auto g-4">
        {questions.map((q, i) => (
          <div className="col" key={q.name1}>
            <div className="maincontainer">
              <div
                className="thecard"
                style={{ transform: `rotateY(${rotates[i]}deg)` }}
                onClick={() => {
                  let _rotates = [...rotates];
                  _rotates[i] = rotates[i] + 180;
                  setRotates(_rotates);
                  playinterface12();
                }}
              >
                <div className="thefront cardcontent">
                  <img
                    src={sources[i]}
                    alt={q.name1}
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>

                <div className="theback cardcontent">
                  <p style={{ fontSize: "50px" }}>{q.name2}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
