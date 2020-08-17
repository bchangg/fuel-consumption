import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./Header";
import Content from "./Content";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState("login");
  const [user, setUser] = useState({});

  const LOGIN = "login";
  const GROCERIES = "groceries";

  useEffect(() => {
    axios
      .get("/auth/loggedIn")
      .then((response) => {
        if (response.data.id !== undefined) {
          setUser(response.data);
          setLoggedIn(true);
          setMode(GROCERIES);
        } else {
          setUser({});
          setLoggedIn(false);
          setMode(LOGIN);
        }
      })
      .catch((error) => {
        setLoggedIn(false);
        setMode(LOGIN);
      });
  }, [loggedIn]);

  return (
    <div className="App">
      <Header
        user={user}
        loggedIn={loggedIn}
        setUser={setUser}
        setMode={setMode}
        setLoggedIn={setLoggedIn}
      />
      <Content
        user={user}
        setUser={setUser}
        mode={mode}
        setMode={setMode}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
    </div>
  );
}
