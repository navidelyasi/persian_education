import React from "react";

export default function LimitedNavBar({ title }) {
  return (
    <nav className="navbar bg-secondary text-white justify-content-center">
      <h2>{title}</h2>
    </nav>
  );
}
