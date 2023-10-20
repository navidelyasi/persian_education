import React, { useState } from "react";
import "../../card.css";
import { playinterface12 } from "../../../hooks/handle-sound-effects";

export default function CardsStudy({ questions }) {
  const [rotates, setRotates] = useState(questions.map((q) => 0));

  const sources = questions.map((q) =>
    require(`../../../icons/unit11/${q.name1}.png`)
  );

  // console.log("Questions are (from CardsStudy) : ", questions);
  // console.log("rotates  is (from CardsStudy) : ", rotates);

  return (
    <div className="container">
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

        {/* <div className="col">
          <div className="maincontainer">
            <div
              className="thecard"
              style={{ transform: `rotateY(${rotate}deg)` }}
              onClick={() => {
                setRotate(rotate + 180);
                playinterface12();
              }}
            >
              <div className="thefront cardcontent">
                <img
                  src={require("../../../icons/unit11/bag.png")}
                  alt="atash"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>

              <div className="theback cardcontent">
                <p style={{ fontSize: "50px" }}>آتش</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
