import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMessage } from "react-icons/ai";
import { Button } from "@mui/material";

const TopBar = () => {
  return (
    <div>
      <div className="top-bar">
        <div className="main-logo">LADOCHE.</div>
        <div className="top-links">
          <h2 style={{ fontSize: 15, fontWeight: "700", marginTop: 10 }}></h2>
          <h2 style={{ fontSize: 15, fontWeight: "700", marginTop: 10 }}>
            About
          </h2>
          <h2 style={{ fontSize: 15, fontWeight: "700", marginTop: 10 }}>
            Cart
          </h2>
          <h2 style={{ fontSize: 15, fontWeight: "700", marginTop: 10 }}>
            Account
          </h2>
        </div>

        <div className="top-icons">
          <BsSearch
            style={{
              fontSize: 18,
              marginLeft: 18,
              paddingTop: 5,
              marginRight: 1,
            }}
          />

          <CgProfile
            style={{
              fontSize: 18,
              marginLeft: 18,
              paddingTop: 5,
              marginRight: 1,
            }}
          />
          <div>
            <Button
              style={{
                paddingTop: 5,
                marginRight: 10,
                backgroundColor: "red",
                borderRadius: 10,
                alignItems: "center",
                color: "blue",
                fontWeight: "700",
              }}>
              <a href="login"> Login</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
