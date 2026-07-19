import { IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function SupplierTable({ suppliers, onEdit, onDelete }) {
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "supplierCode", headerName: "Code", width: 130 },
    { field: "name", headerName: "Supplier Name", width: 180 },
    { field: "contactPerson", headerName: "Contact Person", width: 170 },
    { field: "phone", headerName: "Phone", width: 140 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "city", headerName: "City", width: 130 },
    { field: "rating", headerName: "Rating", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => onEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => onDelete(params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <DataGrid
      rows={suppliers}
      columns={columns}
      pageSizeOptions={[5, 10, 20]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 5 },
        },
      }}
      disableRowSelectionOnClick
    />
  );
}

export default SupplierTable;