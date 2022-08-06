import React, { useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import Footer from "./Footer";

const pad = (num, size) => {
  num = (parseInt(num) + 1).toString();
  while (num.length < size) num = "0" + num;
  return num;
};

const Timer = () => {
  const [hour, updateHour] = useState("00");
  const [minute, updateMinute] = useState("00");
  const [second, updateSecond] = useState("00");

  const updateValues = (sign, threshold, value, updateFunction) => {
    if (sign === "+" && parseInt(value) === threshold) {
      updateFunction("00");
    } else if (sign === "-" && parseInt(value) > 0) {
      updateFunction(pad(value - 2, 2));
    } else if (sign === "-" && parseInt(value) === 0) {
      updateFunction(threshold.toString());
    } else if (sign === "+" && parseInt(value) <= threshold) {
      updateFunction(pad(value % threshold, 2));
    }
  };

  const handleChange = (val, type) => {
    switch (val) {
      case "hour":
        updateValues(type, 23, hour, updateHour);
        break;
      case "minute":
        updateValues(type, 59, minute, updateMinute);
        break;
      case "second":
        updateValues(type, 59, second, updateSecond);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <Navbar />
      <div className="timer">
        <div className="arrows">
          <div className="hour">
            <ArrowDropUpIcon
              fontSize="large"
              className="up"
              onClick={() => {
                handleChange("hour", "+");
              }}
            />
            <ArrowDropDownIcon
              fontSize="large"
              className="down"
              onClick={() => {
                handleChange("hour", "-");
              }}
            />
          </div>
          <div className="minute">
            <ArrowDropUpIcon
              fontSize="large"
              onClick={() => {
                handleChange("minute", "+");
              }}
              className="up"
            />
            <ArrowDropDownIcon
              fontSize="large"
              onClick={() => {
                handleChange("minute", "-");
              }}
              className="down"
            />
          </div>
          <div className="second">
            <ArrowDropUpIcon
              fontSize="large"
              onClick={() => {
                handleChange("second", "+");
              }}
              className="up"
            />
            <ArrowDropDownIcon
              fontSize="large"
              onClick={() => {
                handleChange("second", "-");
              }}
              className="down"
            />
          </div>
        </div>
      </div>
      <div className="values">{`${hour}:${minute}:${second}`}</div>
      <div className="stop">
        <Button size="large" variant="outlined">
          START
        </Button>
      </div>

      <Footer />
    </>
  );
};

export default Timer;
