import { useEffect, useState } from "react";
import { Box, Typography, Paper, Snackbar, Alert } from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";

import SupplierToolbar from "../components/suppliers/SupplierToolbar";
import SupplierTable from "../components/suppliers/SupplierTable";
import SupplierDialog from "../components/suppliers/SupplierDialog";
import DeleteSupplierDialog from "../components/suppliers/DeleteSupplierDialog";

import {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} from "../services/supplierService";

const emptyForm = {
  supplierCode: "",
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  rating: "",
};

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    const data = await getSuppliers();
    setSuppliers(data);
  };

  const handleAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setSelectedSupplier(null);
    setOpenDialog(true);
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setIsEdit(true);

    setForm({
      supplierCode: supplier.supplierCode || "",
      name: supplier.name || "",
      contactPerson: supplier.contactPerson || "",
      phone: supplier.phone || "",
      email: supplier.email || "",
      address: supplier.address || "",
      city: supplier.city || "",
      state: supplier.state || "",
      rating: supplier.rating || "",
    });

    setOpenDialog(true);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      rating: Number(form.rating),
    };

    if (isEdit) {
      await updateSupplier(selectedSupplier.id, payload);
      setSnackbar({
        open: true,
        message: "Supplier updated successfully",
        severity: "success",
      });
    } else {
      await addSupplier(payload);
      setSnackbar({
        open: true,
        message: "Supplier added successfully",
        severity: "success",
      });
    }

    setOpenDialog(false);
    loadSuppliers();
  };

  const handleDeleteClick = (supplier) => {
    setSelectedSupplier(supplier);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteSupplier(selectedSupplier.id);

    setDeleteOpen(false);
    setSnackbar({
      open: true,
      message: "Supplier deleted successfully",
      severity: "success",
    });

    loadSuppliers();
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    `${supplier.name} ${supplier.supplierCode} ${supplier.email} ${supplier.city}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <Navbar />

      <Box>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Suppliers
        </Typography>

        <SupplierToolbar
          search={search}
          setSearch={setSearch}
          onAdd={handleAdd}
        />

        <Paper sx={{ height: 540, width: "100%", p: 2, borderRadius: 3 }}>
          <SupplierTable
            suppliers={filteredSuppliers}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </Paper>
      </Box>

      <SupplierDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        isEdit={isEdit}
      />

      <DeleteSupplierDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        supplier={selectedSupplier}
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

export default Suppliers;