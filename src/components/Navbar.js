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
          to="/timer"
        >
          TIMER
        </Link>
        <Link
          className="link"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/"
        >
          CLOCK
        </Link>
        <Link
          className="link"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/stopwatch"
        >
          STOPWATCH
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
