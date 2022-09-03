import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMessage } from "react-icons/ai";

const TopBar = () => {
  return (
    <div>
      <div className="top-bar">
        <span className="main-logo">LA DOCHE.</span>
        <div className="top-bar">
          <Link to="/">Home</Link>
          <Link to="/">Home</Link>
          <Link to="/">Home</Link>
          <Link to="/">Home</Link>
          <Link to="/">Home</Link>
        </div>

        <div className="top-icons">
          <div>
            <BsSearch />
          </div>
          <CgProfile />
          <AiOutlineMessage />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
