import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";

import SalesOrderToolbar from "../components/salesOrders/SalesOrderToolbar";
import SalesOrderTable from "../components/salesOrders/SalesOrderTable";
import SalesOrderDialog from "../components/salesOrders/SalesOrderDialog";
import DeleteSalesOrderDialog from "../components/salesOrders/DeleteSalesOrderDialog";

import {
  getSalesOrders,
  createSalesOrder,
  deleteSalesOrder,
  completeSalesOrder,
} from "../services/salesOrderService";

import { getProducts } from "../services/productService";

function SalesOrders() {

  const [salesOrders, setSalesOrders] = useState([]);

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [customerName, setCustomerName] = useState("");

  const [items, setItems] = useState([
    {
      productId: "",
      quantity: 1,
      unitPrice: 0,
      lineTotal: 0,
    },
  ]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    loadSalesOrders();
    loadProducts();
  }, []);

  const loadSalesOrders = async () => {
    try {
      const data = await getSalesOrders();
      setSalesOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = () => {

    setCustomerName("");

    setItems([
      {
        productId: "",
        quantity: 1,
        unitPrice: 0,
        lineTotal: 0,
      },
    ]);

    setOpenDialog(true);
  };

  const handleSave = async () => {

    try {

      const body = {

        customerName,

        items,

      };

      await createSalesOrder(body);

      setSnackbar({

        open: true,

        message: "Sales Order Created Successfully",

        severity: "success",

      });

      setOpenDialog(false);

      loadSalesOrders();

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async () => {

    try {

      await deleteSalesOrder(selectedOrder.id);

      setDeleteOpen(false);

      setSnackbar({

        open: true,

        message: "Sales Order Deleted",

        severity: "success",

      });

      loadSalesOrders();

    } catch (error) {

      console.log(error);

    }

  };

  const handleComplete = async (row) => {

    try {

      await completeSalesOrder(row.id);

      setSnackbar({

        open: true,

        message: "Sales Order Completed",

        severity: "success",

      });

      loadSalesOrders();

    } catch (error) {

      console.log(error);

    }

  };

  const filteredOrders = salesOrders.filter((order) =>
    `${order.orderNumber} ${order.customerName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
    return (
    <MainLayout>
      <Navbar />

      <Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          Sales Orders
        </Typography>

        <SalesOrderToolbar
          search={search}
          setSearch={setSearch}
          onAdd={handleAdd}
        />

        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            height: 550,
          }}
        >
          <SalesOrderTable
            salesOrders={filteredOrders}
            onEdit={(row) => {
              console.log("Edit", row);
            }}
            onDelete={(row) => {
              setSelectedOrder(row);
              setDeleteOpen(true);
            }}
            onComplete={handleComplete}
          />
        </Paper>

        <SalesOrderDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          customerName={customerName}
          setCustomerName={setCustomerName}
          products={products}
          items={items}
          setItems={setItems}
          onSave={handleSave}
        />

        <DeleteSalesOrderDialog
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDelete}
          order={selectedOrder}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
        >
          <Alert
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

      </Box>

    </MainLayout>
  );
}

export default SalesOrders;