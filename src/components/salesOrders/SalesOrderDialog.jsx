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

import SalesOrderItemsTable from "./SalesOrderItemsTable";

function SalesOrderDialog({

  open,
  onClose,

  customerName,
  setCustomerName,

  products,

  items,
  setItems,

  onSave,

}) {

  const grandTotal = items.reduce(
    (sum,item)=>sum+Number(item.lineTotal),
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

        Create Sales Order

      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Customer Name"
          value={customerName}
          onChange={(e)=>setCustomerName(e.target.value)}
        />

        <SalesOrderItemsTable
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

export default SalesOrderDialog;