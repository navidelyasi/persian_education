import React, { useState } from "react";
import girl from "../icons/cute-girl.png";
import "./moving.css";

const MovingElement = () => {
  return (
    <div className="moving-element">
      <img src={girl} alt="girl" style={{ width: "350px" }} />
    </div>
  );
};

export default MovingElement;
