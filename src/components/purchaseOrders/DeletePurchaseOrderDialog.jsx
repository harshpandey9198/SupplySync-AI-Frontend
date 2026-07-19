import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function DeletePurchaseOrderDialog({
  open,
  onClose,
  onConfirm,
  order,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Purchase Order</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete{" "}
          <b>{order?.orderNumber}</b>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeletePurchaseOrderDialog;