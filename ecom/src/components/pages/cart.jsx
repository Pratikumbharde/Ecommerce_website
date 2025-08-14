import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cartpage() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cart", {
        withCredentials: true,
      });
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const updateQuantity = async (productId, size, newQuantity) => {
    try {
      await axios.put(
        "http://localhost:5000/cart/update",
        { productId, size, quantity: newQuantity },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeFromCart = async (productId, size) => {
    try {
      await axios.delete(
        `http://localhost:5000/cart/remove/${productId}/${size}`,
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (!cart) return <p>Loading...</p>;
  if (cart.items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={`${item.product._id}-${item.size}`}>
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => navigate(`/product/${item.product._id}`)}
            >
              {item.product.name}
            </span>{" "}
            - ₹{item.product.price} × {item.quantity} |{" "}
            <strong>Size: {item.size}</strong>
            <br />
            <button
              onClick={() =>
                updateQuantity(item.product._id, item.size, item.quantity + 1)
              }
            >
              +
            </button>
            <button
              onClick={() =>
                updateQuantity(item.product._id, item.size, item.quantity - 1)
              }
              disabled={item.quantity === 1}
            >
            </button>
            <button
              onClick={() => removeFromCart(item.product._id, item.size)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <Button
  variant="contained"
  color="primary"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</Button>
    </div>
  );
}
