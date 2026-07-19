import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ProductToolbar({ search, setSearch, onAdd }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
        gap: 2,
      }}
    >
      <TextField
        label="Search Products"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ width: 350 }}
      />

      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
        Add Product
      </Button>
    </Box>
  );
}

export default ProductToolbar;