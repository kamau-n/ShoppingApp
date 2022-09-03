import { Link } from "react-router-dom";
import "../App.css";
import React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
const Header = () => {
  return (
    <div className="header">
      <span className="logo">La Doche</span>
      <input type="text" name="item" id="bar" placeholder="Search..." />
      <span>
        <Link to="/Orders">
          <IconButton
            style={{
              color: "white",
              backgroundColor: "black",
              size: "large",
            }}>
            <AddShoppingCart sx={{ fontSize: "800px" }}></AddShoppingCart>
          </IconButton>
        </Link>
      </span>
      <button className="sb">Search</button>

      <div class="dropdown">
        <h2 class="dropbtn">Account</h2>
        <div class="dropdown-content">
          <a href="login">Login</a>
          <a href="signup">SignUp</a>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
