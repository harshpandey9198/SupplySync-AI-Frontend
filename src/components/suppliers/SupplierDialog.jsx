import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function SupplierDialog({ open, onClose, form, setForm, onSave, isEdit }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Edit Supplier" : "Add Supplier"}</DialogTitle>

      <DialogContent>
        {Object.keys(form).map((key) => (
          <TextField
            key={key}
            margin="normal"
            label={key}
            name={key}
            type={key === "rating" ? "number" : "text"}
            value={form[key]}
            onChange={handleChange}
            fullWidth
          />
        ))}
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

export default SupplierDialog;