import React from "react";

export default function Breadcrumb(props) {
  return (
    <div
      style={{
        textAlign: "left",
        paddingLeft: "20px",
      }}
    >
      <h2>
        {props.mode} >> {props.month}
      </h2>
    </div>
  );
}
