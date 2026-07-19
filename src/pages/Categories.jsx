import { useEffect, useState } from "react";
import { Box, Typography, Paper, Snackbar, Alert } from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";

import CategoryToolbar from "../components/categories/CategoryToolbar";
import CategoryTable from "../components/categories/CategoryTable";
import CategoryDialog from "../components/categories/CategoryDialog";
import DeleteCategoryDialog from "../components/categories/DeleteCategoryDialog";

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

const emptyForm = {
  name: "",
  description: "",
};

function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setSelectedCategory(null);
    setOpenDialog(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEdit(true);
    setForm({
      name: category.name || "",
      description: category.description || "",
    });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    if (isEdit) {
      await updateCategory(selectedCategory.id, form);
      setSnackbar({
        open: true,
        message: "Category updated successfully",
        severity: "success",
      });
    } else {
      await addCategory(form);
      setSnackbar({
        open: true,
        message: "Category added successfully",
        severity: "success",
      });
    }

    setOpenDialog(false);
    loadCategories();
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteCategory(selectedCategory.id);
    setDeleteOpen(false);

    setSnackbar({
      open: true,
      message: "Category deleted successfully",
      severity: "success",
    });

    loadCategories();
  };

  const filteredCategories = categories.filter((category) =>
    `${category.name} ${category.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <Navbar />

      <Box>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Categories
        </Typography>

        <CategoryToolbar
          search={search}
          setSearch={setSearch}
          onAdd={handleAdd}
        />

        <Paper sx={{ height: 540, width: "100%", p: 2, borderRadius: 3 }}>
          <CategoryTable
            categories={filteredCategories}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </Paper>
      </Box>

      <CategoryDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        isEdit={isEdit}
      />

      <DeleteCategoryDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        category={selectedCategory}
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

export default Categories;