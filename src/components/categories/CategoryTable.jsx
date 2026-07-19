import { IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function CategoryTable({ categories, onEdit, onDelete }) {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Category Name", width: 220 },
    { field: "description", headerName: "Description", width: 350 },
    { field: "active", headerName: "Active", width: 120 },
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
      rows={categories}
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

export default CategoryTable;