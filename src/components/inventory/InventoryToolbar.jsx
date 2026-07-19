import { Box, TextField } from "@mui/material";

function InventoryToolbar({ search, setSearch }) {
  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        size="small"
        label="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Box>
  );
}

export default InventoryToolbar;