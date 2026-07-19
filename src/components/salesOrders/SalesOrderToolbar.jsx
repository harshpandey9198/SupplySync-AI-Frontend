 import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function SalesOrderToolbar({
  search,
  setSearch,
  onAdd,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <TextField
        label="Search Sales Orders"
        size="small"
        sx={{ width: 350 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
      >
        Create Sales Order
      </Button>
    </Box>
  );
}

export default SalesOrderToolbar;