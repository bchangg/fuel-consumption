import React from "react";
import Auth from "../Auth";
import Page from "./Page";

const LOGIN = "login";
const REGISTER = "register";
const GROCERIES = "groceries";
const HOUSEHOLDITEMS = "householdItems";
const BILLS = "bills";

export default function Content(props) {
  let mode = props.mode;
  return (
    <div
      className="content"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "grey",
      }}
    >
      {mode === LOGIN && (
        <Auth
          mode={"login"}
          loggedIn={props.loggedIn}
          setMode={props.setMode}
        />
      )}
      {mode === REGISTER && (
        <Auth
          mode={"register"}
          setMode={props.setMode}
          loggedIn={props.loggedIn}
        />
      )}
      {mode !== REGISTER && mode !== LOGIN && <Page mode={mode} />}
    </div>
  );
}
