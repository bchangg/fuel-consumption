import React, { Fragment, useEffect } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import axios from "axios";

export default function Header(props) {
  const handleClick = (mode) => {
    if (mode === "logout") {
      axios
        .post("/auth/logout")
        .then((response) => {
          if (response === "logged out") {
            props.setMode("login");
          }
        })
        .catch((error) => {
          alert("Error logging you out", error);
        });
    } else {
      props.setMode(mode);
    }
  };

  return (
    <div
      className="header"
      style={{
        height: "100%",
        backgroundColor: "brown",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>Spot Me Back</p>
        {props.loggedIn ? (
          <div>
            <Button
              onClick={() => {
                handleClick("groceries");
              }}
            >
              Groceries
            </Button>
            <Button
              onClick={() => {
                handleClick("householdItems");
              }}
            >
              Household Items
            </Button>
            <Button
              onClick={() => {
                handleClick("bills");
              }}
            >
              Bills
            </Button>
            <Button
              onClick={() => {
                handleClick("logout");
              }}
            >
              Log out
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => {
                handleClick("login");
              }}
            >
              Log In
            </Button>
            <Button
              onClick={() => {
                handleClick("register");
              }}
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
