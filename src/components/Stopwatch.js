import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PinnedList from "./List";
const pad = (num, size) => {
  num = (parseInt(num) + 1).toString();
  while (num.length < size) num = "0" + num;
  return num;
};

const Stopwatch = () => {
  const [hour, updateHour] = useState("00");
  const [minute, updateMinute] = useState("00");
  const [second, updateSecond] = useState("00");
  const [flags, updateFlags] = useState([]);
  const [running, setRunning] = useState(false);

  const updateStopWach = () => {
    updateSecond(pad(second, 2));
    if (minute >= 59 && second >= 59) {
      updateMinute("00");
      updateSecond("00");
      updateHour(pad(hour, 2));
    } else if (second >= 59) {
      updateSecond("00");
      updateMinute(pad(minute, 2));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        updateStopWach();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [second, running]);

  const handleReset = () => {
    updateHour("00");
    updateMinute("00");
    updateSecond("00");
    updateFlags([]);
    setRunning(false);
  };

  const handleFlag = () => {
    updateFlags([...flags, `${hour}:${minute}:${second}`]);
    console.log(flags);
  };

  return (
    <>
      <Navbar />
      <div className="stopwatch">
        <div className="values">{`${hour}:${minute}:${second}`}</div>
        <div className="buttons">
          <div className="button">
            <Button
              size="large"
              onClick={() => setRunning(!running)}
              variant="outlined"
            >
              {!running ? "START" : "STOP"}
            </Button>
          </div>
          <div className="button">
            <Button
              size="large"
              onClick={handleFlag}
              color="success"
              variant="outlined"
              disabled={!running}
            >
              FLAG
            </Button>
          </div>
          <div className="button">
            <Button
              onClick={handleReset}
              size="large"
              color="error"
              variant="outlined"
            >
              RESET
            </Button>
          </div>
        </div>
        <div className="list">
          <PinnedList flags={flags.slice(0).reverse()} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Stopwatch;
