import React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart, FavoriteBorder } from "@material-ui/icons";

const Item = ({ product }) => {
  return (
    <Card
      style={{
        maxWidth: "100%",
        width: "70%",
        margin: "auto",
      }}>
      <CardMedia
        image={product.Link}
        title={product.Name}
        style={{
          paddingTop: "86.25%",
          height: 0,
        }}
      />
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Typography gutterBottom variant="h6">
            {product.Name}
            {}
          </Typography>

          <Typography variant="h5">
            {product.Price}
            {}
          </Typography>
        </div>
      </CardContent>
      <CardActions
        disableSpacing
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        <IconButton
          aria-label="Add to Cart"
          onClick={() => {
            const x = { name: product.Name, link: product.Link, quantity: 1 };
            localStorage.setItem(product.Name, JSON.stringify(x));
          }}>
          <AddShoppingCart />
        </IconButton>
        <IconButton arial-label="Set favourite">
          <FavoriteBorder />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Item;
