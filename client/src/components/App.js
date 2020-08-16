import React, { useState, useEffect } from "react";
import axios from "axios";

import logo from "../logo.svg";

import "./App.css";

const callApi = async () => {
  const response = await fetch("/api/hello");
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  return body;
};

export default function App() {
  const [state, setState] = useState({
    response: "",
    post: "",
    responseToPost: "",
  });

  useEffect(() => {
    callApi()
      .then((res) => setState({ ...state, response: res.express }))
      .catch((err) => console.log(err));
  }, [state]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
