import React, { useState, useEffect } from "react";
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
  const [currentSecond, updateCurrentSecond] = useState(1);
  const [currentMinute, updateCurrentMinute] = useState(1);
  const [running, setRunning] = useState(false);
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

  const updateTimer = () => {
    if (parseInt(second) > 0) {
      updateSecond(pad(second - 2, 2));
      updateCurrentSecond(currentSecond + 1);
    } else if (parseInt(minute) > 0 && parseInt(second) === 0) {
      updateSecond("59");
      updateMinute(pad(minute - 2, 2));
    } else if (
      parseInt(hour) > 0 &&
      parseInt(minute) === 0 &&
      parseInt(second) === 0
    ) {
      updateSecond("59");
      updateMinute("59");
      updateHour(pad(hour - 2, 2));
    } else if (currentSecond >= 59 && parseInt(minute) > 0) {
      updateMinute(pad(minute - 2, 2));
      updateCurrentMinute(currentMinute + 1);
      updateCurrentSecond(1);
      updateSecond("59");
    } else if (currentMinute >= 59 && parseInt(hour) > 0) {
      updateHour(pad(hour - 2, 2));
      updateSecond("59");
      updateMinute("59");
      updateCurrentMinute(1);
      updateCurrentSecond(1);
    } else if (currentMinute >= 59 && parseInt(hour) > 0) {
      updateMinute(pad(hour - 2, 2));
    }
  };

  const checkDisableState = () => {
    return parseInt(hour) + parseInt(minute) + parseInt(second) <= 0;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        updateTimer();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [second, running]);

  const handleReset = () => {
    updateHour("00");
    updateMinute("00");
    updateSecond("00");
    updateCurrentMinute(1);
    updateCurrentSecond(1);
    setRunning(false);
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
      <div className="buttons">
        <div className="button">
          <Button
            onClick={() => {
              setRunning(!running);
            }}
            size="large"
            variant="outlined"
            disabled={checkDisableState()}
          >
            {!running ? "START" : "STOP"}
          </Button>
        </div>
        <div className="button">
          <Button
            onClick={() => {
              setRunning(!running);
              handleReset();
            }}
            size="large"
            variant="outlined"
            disabled={checkDisableState()}
            color="error"
          >
            RESET
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Timer;
