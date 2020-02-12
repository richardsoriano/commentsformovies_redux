import React from "react";
import spinner from "./spinner.gif";
export default function Loading() {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading"
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </div>
  );
}
