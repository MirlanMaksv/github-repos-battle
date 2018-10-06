import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
  return (
    <ul className="nav">
      <li>
        <NavLink exact activeClassName="activeNav" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="activeNav" to="/battle">
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="activeNav" to="/popular">
          Popular
        </NavLink>
      </li>
    </ul>
  );
};
