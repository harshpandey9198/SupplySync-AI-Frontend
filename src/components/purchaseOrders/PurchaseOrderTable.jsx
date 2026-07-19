import { DataGrid } from "@mui/x-data-grid";

import {
  Chip,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function PurchaseOrderTable({
  purchaseOrders,
  onEdit,
  onDelete,
  onReceive,
}) {

  const columns = [

    {
      field: "id",
      headerName: "ID",
      width: 70,
    },

    {
      field: "orderNumber",
      headerName: "PO Number",
      width: 170,
    },

    {
      field: "supplierName",
      headerName: "Supplier",
      width: 220,
    },

    {
      field: "status",
      headerName: "Status",
      width: 140,

      renderCell: (params) => {

        let color = "default";

        if (params.value === "PENDING")
          color = "warning";

        if (params.value === "RECEIVED")
          color = "success";

        if (params.value === "CANCELLED")
          color = "error";

        return (
          <Chip
            label={params.value}
            color={color}
            size="small"
          />
        );
      },
    },

    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 160,

      renderCell: (params) => (
        <>₹ {params.value}</>
      ),
    },

    {
      field: "orderDate",
      headerName: "Order Date",
      width: 220,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 190,
      sortable: false,

      renderCell: (params) => (

        <Stack direction="row">

          <Tooltip title="Receive Order">

            <IconButton
              color="success"
              onClick={() => onReceive(params.row)}
            >
              <CheckCircleIcon />
            </IconButton>

          </Tooltip>

          <Tooltip title="Edit">

            <IconButton
              color="primary"
              onClick={() => onEdit(params.row)}
            >
              <EditIcon />
            </IconButton>

          </Tooltip>

          <Tooltip title="Delete">

            <IconButton
              color="error"
              onClick={() => onDelete(params.row)}
            >
              <DeleteIcon />
            </IconButton>

          </Tooltip>

        </Stack>

      ),
    },
  ];

  return (
    <DataGrid
      rows={purchaseOrders}
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

export default PurchaseOrderTable;