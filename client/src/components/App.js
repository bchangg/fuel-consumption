import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./Header";
import Content from "./Content";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [mode, setMode] = useState("login");
  useEffect(() => {
    axios
      .get("/auth/loggedIn")
      .then((response) => {
        if (response.data) {
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        setLoggedIn(false);
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <Header loggedIn={loggedIn} setMode={setMode} />
      <Content
        mode={mode}
        setMode={setMode}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
    </div>
  );
}
