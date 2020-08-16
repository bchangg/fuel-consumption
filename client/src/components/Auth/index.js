import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function Auth(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    console.log(props.loggedIn);
    if (props.loggedIn) {
      props.setMode("groceries");
    } else {
      props.setMode("login");
    }
  }, [props]);

  const handleLogin = (event) => {
    axios
      .post("/auth/login", { email: email, password: password })
      .then((response) => {
        if (response.body === "success") {
          props.setLoggedIn(true);
        } else {
          alert("Error logging in");
          props.setLoggedIn(false);
        }
        props.setLoggedIn(true);
      })
      .catch((error) => {
        props.setLoggedIn(false);
      });
  };

  const handleRegister = (event) => {
    axios
      .post("/auth/register", {
        address: streetAddress,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
      })
      .then((response) => {
        if (response.body === "success") {
          props.setLoggedIn(true);
        } else {
          alert("Error registering");
          props.setLoggedIn(false);
        }
      })
      .catch((error) => {
        props.setLoggedIn(false);
      });
  };

  return (
    <form
      className="login-form"
      style={{
        minHeight: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "pink",
        padding: "50px 50px",
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      {props.mode === "register" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            required
            id="register-first-name"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            id="register-last-name"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            required
            id="register-address"
            label="Address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          required
          id="user-email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="user-password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {props.mode === "register" && (
          <TextField
            required
            id="register-password-confirmation"
            label="Confirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        )}
      </div>
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        onSubmit={props.mode === "register" ? handleRegister : handleLogin}
      >
        {props.mode === "register" ? "Register" : "Log In"}
      </Button>
    </form>
  );
}
