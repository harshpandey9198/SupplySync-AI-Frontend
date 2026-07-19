import { useEffect, useState } from "react";
import { Box, Typography, Paper, Snackbar, Alert } from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";

import WarehouseToolbar from "../components/warehouses/WarehouseToolbar";
import WarehouseTable from "../components/warehouses/WarehouseTable";
import WarehouseDialog from "../components/warehouses/WarehouseDialog";
import DeleteWarehouseDialog from "../components/warehouses/DeleteWarehouseDialog";

import {
  getWarehouses,
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from "../services/warehouseService";

const emptyForm = {
  warehouseCode: "",
  name: "",
  managerName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  capacity: "",
};

function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    loadWarehouses();
  }, []);

  const loadWarehouses = async () => {
    const data = await getWarehouses();
    setWarehouses(data);
  };

  const handleAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setSelectedWarehouse(null);
    setOpenDialog(true);
  };

  const handleEdit = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsEdit(true);

    setForm({
      warehouseCode: warehouse.warehouseCode || "",
      name: warehouse.name || "",
      managerName: warehouse.managerName || "",
      phone: warehouse.phone || "",
      address: warehouse.address || "",
      city: warehouse.city || "",
      state: warehouse.state || "",
      capacity: warehouse.capacity || "",
    });

    setOpenDialog(true);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      capacity: Number(form.capacity),
    };

    if (isEdit) {
      await updateWarehouse(selectedWarehouse.id, payload);
      setSnackbar({
        open: true,
        message: "Warehouse updated successfully",
        severity: "success",
      });
    } else {
      await addWarehouse(payload);
      setSnackbar({
        open: true,
        message: "Warehouse added successfully",
        severity: "success",
      });
    }

    setOpenDialog(false);
    loadWarehouses();
  };

  const handleDeleteClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteWarehouse(selectedWarehouse.id);

    setDeleteOpen(false);
    setSnackbar({
      open: true,
      message: "Warehouse deleted successfully",
      severity: "success",
    });

    loadWarehouses();
  };

  const filteredWarehouses = warehouses.filter((warehouse) =>
    `${warehouse.name} ${warehouse.warehouseCode} ${warehouse.city} ${warehouse.managerName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <Navbar />

      <Box>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Warehouses
        </Typography>

        <WarehouseToolbar
          search={search}
          setSearch={setSearch}
          onAdd={handleAdd}
        />

        <Paper sx={{ height: 540, width: "100%", p: 2, borderRadius: 3 }}>
          <WarehouseTable
            warehouses={filteredWarehouses}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </Paper>
      </Box>

      <WarehouseDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        isEdit={isEdit}
      />

      <DeleteWarehouseDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        warehouse={selectedWarehouse}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </MainLayout>
  );
}

export default Warehouses;