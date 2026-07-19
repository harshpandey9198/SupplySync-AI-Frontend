import { IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductTable({ products, onEdit, onDelete }) {
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "productCode", headerName: "Code", width: 120 },
    { field: "name", headerName: "Product Name", width: 180 },
    { field: "category", headerName: "Category", width: 140 },
    { field: "brand", headerName: "Brand", width: 140 },
    { field: "unitPrice", headerName: "Price", width: 110 },
    { field: "quantity", headerName: "Qty", width: 100 },
    { field: "active", headerName: "Active", width: 100 },
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
      rows={products}
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

export default ProductTable;