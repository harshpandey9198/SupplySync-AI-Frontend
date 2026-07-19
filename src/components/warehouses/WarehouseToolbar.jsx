import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function WarehouseToolbar({ search, setSearch, onAdd }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <TextField
        label="Search Warehouses"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ width: 350 }}
      />

      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
        Add Warehouse
      </Button>
    </Box>
  );
}

export default WarehouseToolbar;