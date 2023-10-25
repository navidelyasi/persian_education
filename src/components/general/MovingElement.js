import React, { useState } from "react";
import girl from "../../data/icons/cute-girl.png";
import "../css/moving.css";

const MovingElement = () => {
  return (
    <div className="moving-element">
      <img src={girl} alt="girl" style={{ width: "350px" }} />
    </div>
  );
};
export default MovingElement;
