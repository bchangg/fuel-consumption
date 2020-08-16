import React from "react";

export default function Page(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0px 50px 0px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        <p>{props.mode} > Date</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </div>
    </div>
  );
}
