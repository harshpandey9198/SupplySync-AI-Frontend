import { IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function WarehouseTable({ warehouses, onEdit, onDelete }) {
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "warehouseCode", headerName: "Code", width: 140 },
    { field: "name", headerName: "Warehouse Name", width: 200 },
    { field: "managerName", headerName: "Manager", width: 160 },
    { field: "phone", headerName: "Phone", width: 140 },
    { field: "city", headerName: "City", width: 130 },
    { field: "state", headerName: "State", width: 150 },
    { field: "capacity", headerName: "Capacity", width: 120 },
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
      rows={warehouses}
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

export default WarehouseTable;