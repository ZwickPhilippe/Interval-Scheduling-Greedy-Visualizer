import React from "react";
import "../App.css";

function Interval(props) {
  return (
    <div
      style={{
        width: props.endTime - props.startTime + "%",
        left: props.startTime + "%",
        backgroundColor: props.color,
        fontSize: "60%",
      }}
      className="interval"
    >
      <h1>{props.name}</h1>
    </div>
  );
}

export default Interval;
