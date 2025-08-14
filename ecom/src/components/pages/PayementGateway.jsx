// pages/PaymentGateway.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PaymentGateway() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (success = true) => {
    setLoading(true);
    try {
        axios.delete(`http://localhost:5000/cart/clear`, {
            withCredentials: true
        })
        navigate(success ? "/payment-success" : "/payment-failed");
     
    }
    catch (err) {
        alert("Something went wrong during payment.");
        navigate("/payment-failed");
    }
    finally {
        setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Payment Gateway
      </Typography>
      <Typography variant="body1" gutterBottom>
        Simulate payment for order <b>{orderId}</b>
      </Typography>

      <Button
        variant="contained"
        color="success"
        sx={{ mt: 4, mr: 2 }}
        onClick={() => handlePayment(true)}
        disabled={loading}
      >
        Pay Now
      </Button>

      <Button
        variant="outlined"
        color="error"
        sx={{ mt: 4 }}
        onClick={() => handlePayment(false)}
        disabled={loading}
      >
        Fail Payment
      </Button>
    </Box>
  );
}
