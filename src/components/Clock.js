import React, { useEffect, useState } from "react";
import fetchTime from "../api/fetchTime";

const ONEHOUR = 60 * 60 * 1000;
const DATE_OPTIONS = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const Clock = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [datetimeobj, setDatetime] = useState("");
  useEffect(() => {
    const getLocalTime = async () => {
      const response = await fetchTime();
      const { datetime } = response.data;
      const d = new Date(datetime);
      setDate(d.toLocaleDateString("en-US", DATE_OPTIONS));
      setTime(d.toLocaleTimeString("en-US", { hour12: false }));
      setDatetime(datetime);
    };
    getLocalTime();
    const interval = setInterval(() => {
      getLocalTime();
    }, ONEHOUR);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date(datetimeobj);
      d.setSeconds(d.getSeconds() + 1);
      setTime(d.toLocaleTimeString("en-US", { hour12: false }));
      setDatetime(d);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="clock">{time}</div>
      <div className="date">{date}</div>
    </>
  );
};

export default Clock;
