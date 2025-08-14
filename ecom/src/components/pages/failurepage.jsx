// FailurePage.jsx
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import CancelIcon from "@mui/icons-material/Cancel";

export default function FailurePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Payment Failed
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Something went wrong during the transaction.
        Please try again or contact support.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/cart")}
      >
        Back to Cart
      </Button>
    </Box>
  );
}
