import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import PurchaseOrderItemsTable from "./PurchaseOrderItemsTable";

function PurchaseOrderDialog({

  open,
  onClose,
  suppliers,
  products,
  supplierId,
  setSupplierId,
  items,
  setItems,
  onSave,

}) {

  const grandTotal = items.reduce(
    (sum, item) => sum + Number(item.lineTotal),
    0
  );

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >

      <DialogTitle>

        Create Purchase Order

      </DialogTitle>

      <DialogContent>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Supplier"
          value={supplierId}
          onChange={(e) =>
            setSupplierId(e.target.value)
          }
        >

          {suppliers.map((supplier) => (

            <MenuItem
              key={supplier.id}
              value={supplier.id}
            >
              {supplier.name}
            </MenuItem>

          ))}

        </TextField>

        <PurchaseOrderItemsTable
          items={items}
          setItems={setItems}
          products={products}
        />

        <Typography
          variant="h6"
          mt={3}
        >
          Grand Total : ₹ {grandTotal}
        </Typography>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>

          Cancel

        </Button>

        <Button
          variant="contained"
          onClick={onSave}
        >

          Save Order

        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default PurchaseOrderDialog;