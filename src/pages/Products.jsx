import { useEffect, useState } from "react";
import { Box, Typography, Paper, Snackbar, Alert } from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";

import ProductToolbar from "../components/products/ProductToolbar";
import ProductTable from "../components/products/ProductTable";
import ProductDialog from "../components/products/ProductDialog";
import DeleteDialog from "../components/products/DeleteDialog";

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const emptyForm = {
  productCode: "",
  name: "",
  description: "",
  category: "",
  brand: "",
  unitPrice: "",
  quantity: "",
  reorderLevel: "",
  supplier: "",
  warehouse: "",
};

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setSelectedProduct(null);
    setOpenDialog(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEdit(true);
    setForm({
      productCode: product.productCode || "",
      name: product.name || "",
      description: product.description || "",
      category: product.category || "",
      brand: product.brand || "",
      unitPrice: product.unitPrice || "",
      quantity: product.quantity || "",
      reorderLevel: product.reorderLevel || "",
      supplier: product.supplier || "",
      warehouse: product.warehouse || "",
    });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      unitPrice: Number(form.unitPrice),
      quantity: Number(form.quantity),
      reorderLevel: Number(form.reorderLevel),
    };

    if (isEdit) {
      await updateProduct(selectedProduct.id, payload);
      setSnackbar({
        open: true,
        message: "Product updated successfully",
        severity: "success",
      });
    } else {
      await addProduct(payload);
      setSnackbar({
        open: true,
        message: "Product added successfully",
        severity: "success",
      });
    }

    setOpenDialog(false);
    loadProducts();
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteProduct(selectedProduct.id);
    setDeleteOpen(false);

    setSnackbar({
      open: true,
      message: "Product deleted successfully",
      severity: "success",
    });

    loadProducts();
  };

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.productCode} ${product.category} ${product.brand}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <Navbar />

      <Box>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Products
        </Typography>

        <ProductToolbar search={search} setSearch={setSearch} onAdd={handleAdd} />

        <Paper sx={{ height: 540, width: "100%", p: 2, borderRadius: 3 }}>
          <ProductTable
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </Paper>
      </Box>

      <ProductDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        isEdit={isEdit}
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        product={selectedProduct}
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

export default Products;