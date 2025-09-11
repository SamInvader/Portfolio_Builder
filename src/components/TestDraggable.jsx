import React from "react";
import Draggable from "react-draggable";

export default function TestDraggable() {
  return (
    <div
      style={{
        width: 300,
        height: 300,
        border: "1px solid black",
        position: "relative",
        margin: "50px auto",
      }}
    >
      <Draggable>
        <div
          style={{
            width: 100,
            height: 100,
            background: "red",
            cursor: "move",
          }}
        />
      </Draggable>
    </div>
  );
}