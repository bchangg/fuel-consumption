import React from "react";
import Auth from "../Auth";
import Page from "./Page";

const LOGIN = "login";
const REGISTER = "register";

export default function Content(props) {
  const { mode } = props;
  return (
    <div
      className="content"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#F2F2F2",
      }}
    >
      {mode !== REGISTER && mode !== LOGIN ? (
        <Page {...props} />
      ) : (
        <Auth {...props} />
      )}
    </div>
  );
}
