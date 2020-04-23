import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import RewardsContext from "../../context/rewards/rewardsContext";

const Navbar = ({ title, icon }) => {
  const rewardsContext = useContext(RewardsContext);
  const { coins } = rewardsContext;

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Tasks</Link>
        </li>
        <li>
          <Link to="/shopping-list">Shopping List</Link>
        </li>
        <li>
          <Link to="/rewards">Rewards ({coins} coins)</Link>
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
  title: "Forget-Me-Not",
  icon: "far fa-gem",
};

export default Navbar;
