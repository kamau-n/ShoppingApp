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
        <div className="main-logo">LA DOCHE.</div>
        <div className="top-links">
          <Link to="/">Account</Link>
          <Link to="/">Home</Link>
          <Link to="/">Home</Link>
          <Link to="/">Home</Link>
          <Link to="/">Home</Link>
        </div>

        <div className="top-icons">
          <BsSearch
            style={{
              fontSize: 15,
              marginLeft: 15,
              paddingTop: 5,
              marginRight: 1,
            }}
          />

          <CgProfile
            style={{
              fontSize: 15,
              marginLeft: 15,
              paddingTop: 5,
              marginRight: 1,
            }}
          />

          <AiOutlineMessage
            style={{
              fontSize: 15,
              marginLeft: 15,
              paddingTop: 5,
              marginRight: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
