import React from "react";

export default function LimitedNavBar({ title }) {
  return (
    <nav
      className="navbar bg-secondary text-white justify-content-center"
      style={{ fontSize: "32px" }}
    >
      <h2>{title}</h2>
    </nav>
  );
}
