import React, { useEffect, useState } from "react";
import NavBar from "../components/general/NavBar";
import { useNavigate } from "react-router-dom";

// ############################################################
// ####################    constants     ######################
// ############################################################
const levelsUnits = [
  { name: "1", units: ["1", "2", "3"] },
  { name: "2", units: ["1", "2"] },
];

export default function Level2() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [selectedUnit, setSelectedUnit] = useState("0");
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (selectedLevel !== "0") {
      setUnits(
        levelsUnits.filter((val) => {
          return val.name === selectedLevel;
        })[0].units
      );
    }
  }, [selectedLevel]);

  return (
    <>
      <NavBar />
      <br />
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-8 clearfix">
            <button
              disabled={selectedUnit === "0"}
              className="btn btn-outline-success float-end"
              onClick={() => {
                // navigate("/create-exercise-multi", {
                //   state: { level: "1", unit: "1", number: 5 },
                // });
              }}
            >
              ساختن سوال های چند گزینه ای
            </button>
            <br />
            <br />
            <button
              disabled={selectedUnit === "0"}
              className="btn btn-outline-success float-end"
              onClick={() => {
                // navigate("/create-exercise-filling", {
                //   state: { level: "1", unit: "1", number: 4 },
                // });
              }}
            >
              ساختن سوال های جای خالی در متن
            </button>
          </div>
          <div className="col">
            <div className="clearfix">
              <h3 className="float-end">:سطح را انتخاب کنید</h3>
            </div>
            <ul className="list-group">
              {levelsUnits.map((val, index) => (
                <a
                  key={index}
                  href="#"
                  className={
                    val.name === selectedLevel
                      ? "list-group-item float-end active"
                      : "list-group-item float-end"
                  }
                  onClick={() => {
                    setSelectedLevel(val.name);
                    setSelectedUnit("0");
                  }}
                >
                  <div className="float-end">سطح {val.name}</div>
                </a>
              ))}
            </ul>
            <br />
            <hr />
            <div className="clearfix">
              <h3 className="float-end">:درس ها</h3>
            </div>
            <ul className="list-group">
              {units.map((val, i) => (
                <a
                  key={i}
                  href="#"
                  className={
                    val === selectedUnit
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                  style={{ color: "" }}
                  onClick={() => {
                    setSelectedUnit(val);
                  }}
                >
                  <div className="float-end">درس {val}</div>
                </a>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
