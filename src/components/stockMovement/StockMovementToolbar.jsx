import { Box, TextField } from "@mui/material";

function StockMovementToolbar({
  search,
  setSearch,
}) {
  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        size="small"
        label="Search Stock Movement"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Box>
  );
}

export default StockMovementToolbar;