import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function PurchaseOrderItemsTable({
  items,
  setItems,
  products,
}) {

  const handleChange = (index, field, value) => {

    const updated = [...items];

    updated[index][field] = value;

    if (field === "quantity" || field === "unitPrice") {

      updated[index].lineTotal =
        Number(updated[index].quantity) *
        Number(updated[index].unitPrice);

    }

    setItems(updated);
  };

  const addRow = () => {

    setItems([
      ...items,
      {
        productId: "",
        quantity: 1,
        unitPrice: 0,
        lineTotal: 0,
      },
    ]);

  };

  const removeRow = (index) => {

    const updated = [...items];

    updated.splice(index, 1);

    setItems(updated);

  };

  return (

    <>

      {items.map((item, index) => (

        <Grid
          container
          spacing={2}
          key={index}
          sx={{ mb: 2 }}
        >

          <Grid item xs={4}>

            <TextField
              select
              fullWidth
              label="Product"
              value={item.productId}
              onChange={(e) =>
                handleChange(
                  index,
                  "productId",
                  e.target.value
                )
              }
            >

              {products.map((p) => (

                <MenuItem
                  key={p.id}
                  value={p.id}
                >
                  {p.name}
                </MenuItem>

              ))}

            </TextField>

          </Grid>

          <Grid item xs={2}>

            <TextField
              type="number"
              fullWidth
              label="Qty"
              value={item.quantity}
              onChange={(e) =>
                handleChange(
                  index,
                  "quantity",
                  e.target.value
                )
              }
            />

          </Grid>

          <Grid item xs={2}>

            <TextField
              type="number"
              fullWidth
              label="Price"
              value={item.unitPrice}
              onChange={(e) =>
                handleChange(
                  index,
                  "unitPrice",
                  e.target.value
                )
              }
            />

          </Grid>

          <Grid item xs={2}>

            <TextField
              fullWidth
              label="Total"
              value={item.lineTotal}
              disabled
            />

          </Grid>

          <Grid item xs={2}>

            <IconButton
              color="error"
              onClick={() => removeRow(index)}
            >
              <DeleteIcon />
            </IconButton>

          </Grid>

        </Grid>

      ))}

      <Box mt={2}>

        <Button
          startIcon={<AddIcon />}
          onClick={addRow}
        >
          Add Item
        </Button>

      </Box>

    </>

  );

}

export default PurchaseOrderItemsTable;