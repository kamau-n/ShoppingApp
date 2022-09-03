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
import { Delete, Add, Remove } from "@material-ui/icons";

const Item = ({ product }) => {
  return (
    <Card
      style={{
        maxWidth: "100%",
        width: "70%",
        margin: "auto",
      }}>
      <CardMedia
        image={product.link}
        title={product.name}
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
            {product.name}
            {}
          </Typography>

          <Typography variant="h5">
            {product.price}
            {}
          </Typography>

          <Typography>
            <IconButton>
              <Add />
            </IconButton>
          </Typography>

          <Typography variant="h5">
            {product.quantity}
            {}
          </Typography>

          <IconButton>
            <Remove />
          </IconButton>
        </div>
      </CardContent>
      <CardActions
        disableSpacing
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}>
        <IconButton
          aria-label="Add to Cart"
          onClick={() => {
            localStorage.removeItem(product.name);
            window.location.reload();
          }}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Item;
