import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import RewardsContext from "../../context/rewards/rewardsContext";

const Navbar = ({ title, icon }) => {
  const rewardsContext = useContext(RewardsContext);
  const { coins } = rewardsContext;

  return (
    <div className="navbar bg-primary">
      <h3>
        <i className={icon} />
        {" " + title}
      </h3>
      <ul>
        <li>
          <Link to="/">Tasks</Link>
        </li>
        <li>
          <Link to="/shopping-list">Shopping</Link>
        </li>
        <li>
          <Link to="/rewards">({coins} coins)</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "The Todo Game",
  icon: "far fa-gem",
};

export default Navbar;
