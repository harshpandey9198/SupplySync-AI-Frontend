import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function ProductDialog({ open, onClose, form, setForm, onSave, isEdit }) {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>

      <DialogContent>
        <TextField
          margin="normal"
          label="Product Code"
          name="productCode"
          value={form.productCode}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          margin="normal"
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          margin="normal"
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          margin="normal"
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          margin="normal"
          label="Brand"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          margin="normal"
          label="Unit Price"
          name="unitPrice"
          type="number"
          value={form.unitPrice}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          margin="normal"
          label="Quantity"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          margin="normal"
          label="Reorder Level"
          name="reorderLevel"
          type="number"
          value={form.reorderLevel}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          margin="normal"
          label="Supplier"
          name="supplier"
          value={form.supplier}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          margin="normal"
          label="Warehouse"
          name="warehouse"
          value={form.warehouse}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={onSave}>
          {isEdit ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductDialog;