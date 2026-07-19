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

import PurchaseOrderToolbar from "../components/purchaseOrders/PurchaseOrderToolbar";
import PurchaseOrderTable from "../components/purchaseOrders/PurchaseOrderTable";
import PurchaseOrderDialog from "../components/purchaseOrders/PurchaseOrderDialog";
import DeletePurchaseOrderDialog from "../components/purchaseOrders/DeletePurchaseOrderDialog";

import {
  getPurchaseOrders,
  createPurchaseOrder,
  deletePurchaseOrder,
  receivePurchaseOrder,
} from "../services/purchaseOrderService";

import { getSuppliers } from "../services/supplierService";
import { getProducts } from "../services/productService";

function PurchaseOrders() {

  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const [suppliers, setSuppliers] = useState([]);

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [supplierId, setSupplierId] = useState("");

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
    loadPurchaseOrders();
    loadMasterData();
  }, []);

  const loadPurchaseOrders = async () => {
    try {
      const data = await getPurchaseOrders();
      setPurchaseOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMasterData = async () => {
    try {
      const supplierData = await getSuppliers();
      const productData = await getProducts();

      setSuppliers(supplierData);
      setProducts(productData);

    } catch (error) {
      console.log(error);
    }
  };

  const handleReceive = async (row) => {

    try {

      await receivePurchaseOrder(row.id);

      setSnackbar({
        open: true,
        message: "Purchase Order Received",
        severity: "success",
      });

      loadPurchaseOrders();

    } catch (error) {
      console.log(error);
    }

  };

  const handleAdd = () => {

    setSupplierId("");

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
        supplierId,
        items,
      };

      await createPurchaseOrder(body);

      setSnackbar({
        open: true,
        message: "Purchase Order Created Successfully",
        severity: "success",
      });

      setOpenDialog(false);

      loadPurchaseOrders();

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async () => {

    try {

      await deletePurchaseOrder(selectedOrder.id);

      setDeleteOpen(false);

      setSnackbar({
        open: true,
        message: "Purchase Order Deleted",
        severity: "success",
      });

      loadPurchaseOrders();

    } catch (error) {

      console.log(error);

    }

  };

  const filteredOrders = purchaseOrders.filter((order) =>
    `${order.orderNumber} ${order.supplierName}`
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
          Purchase Orders
        </Typography>

        <PurchaseOrderToolbar
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
          <PurchaseOrderTable
            purchaseOrders={filteredOrders}
            onEdit={(row) => {
              console.log("Edit", row);
            }}
            onDelete={(row) => {
              setSelectedOrder(row);
              setDeleteOpen(true);
            }}
            onReceive={handleReceive}
          />
        </Paper>

        <PurchaseOrderDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          suppliers={suppliers}
          products={products}
          supplierId={supplierId}
          setSupplierId={setSupplierId}
          items={items}
          setItems={setItems}
          onSave={handleSave}
        />

        <DeletePurchaseOrderDialog
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

export default PurchaseOrders;