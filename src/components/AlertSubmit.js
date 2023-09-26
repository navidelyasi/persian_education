import React from "react";

export default function AlertSubmit({ message, handleResponse }) {
  const _message = message.split("\n");
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.2)",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <div className="alert alert-primary">
          {_message.map((m) => (
            <h3>{m}</h3>
          ))}
          <div className="container">
            <div className="row">
              <button
                className="col btn-lg btn btn-outline-primary"
                onClick={() => {
                  handleResponse("yes");
                }}
              >
                yes, I'm sure, submit all
              </button>
              <div className="col" />
              <button
                className="col btn btn-lg btn-outline-primary"
                onClick={() => {
                  handleResponse("no");
                }}
              >
                no, let me check again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
