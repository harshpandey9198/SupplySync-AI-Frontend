import { DataGrid } from "@mui/x-data-grid";
import {
  Chip,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function InventoryTable({

  inventory,

  onStockIn,

  onStockOut,

}) {

  const columns = [

    {
      field: "id",
      headerName: "ID",
      width: 70,
    },

    {
      field: "productName",
      headerName: "Product",
      width: 250,
    },

    {
      field: "categoryName",
      headerName: "Category",
      width: 180,
    },

    {
      field: "warehouseName",
      headerName: "Warehouse",
      width: 180,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      width: 120,
    },

    {
      field: "minimumStock",
      headerName: "Minimum",
      width: 120,
    },

    {
      field: "status",
      headerName: "Status",
      width: 160,

      renderCell: (params) => {

        const row = params.row;

        return row.quantity <= row.minimumStock ?

          <Chip
            label="Low Stock"
            color="error"
          />

          :

          <Chip
            label="Available"
            color="success"
          />;

      }

    },

    {

      field: "actions",

      headerName: "Actions",

      width: 170,

      sortable: false,

      renderCell: (params) => (

        <Stack direction="row">

          <Tooltip title="Stock In">

            <IconButton

              color="success"

              onClick={() => onStockIn(params.row)}

            >

              <AddCircleIcon />

            </IconButton>

          </Tooltip>

          <Tooltip title="Stock Out">

            <IconButton

              color="error"

              onClick={() => onStockOut(params.row)}

            >

              <RemoveCircleIcon />

            </IconButton>

          </Tooltip>

        </Stack>

      ),

    },

  ];

  return (

    <DataGrid

      rows={inventory}

      columns={columns}

      pageSizeOptions={[5,10,20]}

      initialState={{

        pagination:{

          paginationModel:{

            pageSize:5

          }

        }

      }}

      disableRowSelectionOnClick

    />

  );

}

export default InventoryTable;