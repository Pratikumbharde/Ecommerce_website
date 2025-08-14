// BillSummary.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box, Button, List, ListItem, ListItemText, Typography
} from "@mui/material";

export default function BillSummary() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  // Called when user presses “Buy” in cart
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/orders/create",
          {},                            // no body needed
          { withCredentials: true }
        );
        setOrder(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Could not create order");
        navigate("/cart");
      }
    })();
  }, []);

  if (!order) return <p>Loading bill…</p>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Order Summary</Typography>

      <List>
        {order.items.map((i, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={`${i.name}  (Size: ${i.size})`}
              secondary={`₹${i.price}  ×  ${i.quantity}`}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Grand Total: ₹{order.total}
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => navigate(`/payment-gateway/${order.orderId}`)}
      >
        Proceed to Payment
      </Button>
    </Box>
  );
}
