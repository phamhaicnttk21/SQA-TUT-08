import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main"; // Import Main instead of App
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
