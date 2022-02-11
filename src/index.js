import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// file that kickstarts react application, renders to DOM

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
