import React from "react";
import { NavLink as Link } from "react-router-dom";
const Navbar = () => {
  let activeStyle = {
    textDecoration: "underline",
  };
  return (
    <>
      <nav className="navbar">
        <Link
          className="link"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/clock/timer"
        >
          TIMER
        </Link>
        <Link
          className="link"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/clock"
        >
          CLOCK
        </Link>
        <Link
          className="link"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/clock/stopwatch"
        >
          STOPWATCH
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
