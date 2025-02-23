onClick={() => {
    let cart = localStorage.getItem("ladoche_shopping_cart");

    let cart2 = JSON.parse(cart);
    const detail = {
      name: ${details.Name},
      id: ${details.Id},
      price: ${details.Price},
      link: ${details.Link},
      quantity: quantity,
    };
    const name = details.Name;
    cart2.push({ name: detail });

    try {
      localStorage.removeItem("ladoche_shopping_cart");
      localStorage.setItem(
        "ladoche_shopping_cart",
        JSON.stringify(cart2)
      );
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  }}