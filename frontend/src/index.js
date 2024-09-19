import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom"; // if you're using React Router for routing

// import { DataProvider } from "./handleDataChange/context&provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
