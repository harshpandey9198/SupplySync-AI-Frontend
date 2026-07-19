import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function CategoryToolbar({ search, setSearch, onAdd }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <TextField
        label="Search Categories"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ width: 350 }}
      />

      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
        Add Category
      </Button>
    </Box>
  );
}

export default CategoryToolbar;