import {
  Paper,
  Typography,
} from "@mui/material";

function LowStockCard({ count }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        background: "#ef4444",
        color: "#fff",
        mb: 3,
      }}
    >
      <Typography variant="h6">
        Low Stock Products
      </Typography>

      <Typography
        variant="h3"
        fontWeight="bold"
      >
        {count}
      </Typography>
    </Paper>
  );
}

export default LowStockCard;