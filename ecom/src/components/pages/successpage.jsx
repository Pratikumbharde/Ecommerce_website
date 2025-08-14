// SuccessPage.jsx
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4">
        Payment Successful!
      </Typography>
      <Typography variant="body1">
        Your order has been placed. Thank you for shopping with us.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Box>
  );
}
