import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";
import "./components/main.css";
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/clock" element={<App />}></Route>
      <Route index element={<App />} />
      <Route path="/clock/time" element={<App />}></Route>
      <Route path="/clock/timer" element={<Timer />}></Route>
      <Route path="/clock/stopwatch" element={<Stopwatch />}></Route>
    </Routes>
  </BrowserRouter>
);
