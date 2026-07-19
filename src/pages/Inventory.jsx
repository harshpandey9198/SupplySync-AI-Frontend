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

import InventoryToolbar from "../components/inventory/InventoryToolbar";
import InventoryTable from "../components/inventory/InventoryTable";
import StockInDialog from "../components/inventory/StockInDialog";
import StockOutDialog from "../components/inventory/StockOutDialog";
import LowStockCard from "../components/inventory/LowStockCard";

import {
  getInventory,
  stockIn,
  stockOut,
  getLowStock,
} from "../services/inventoryService";

function Inventory() {

  const [inventory, setInventory] = useState([]);

  const [lowStockCount, setLowStockCount] = useState(0);

  const [search, setSearch] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);

  const [stockInOpen, setStockInOpen] = useState(false);

  const [stockOutOpen, setStockOutOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({

    open: false,

    message: "",

    severity: "success",

  });

  useEffect(() => {

    loadInventory();

    loadLowStock();

  }, []);

  const loadInventory = async () => {

    try {

      const data = await getInventory();

      setInventory(data);

    } catch (error) {

      console.log(error);

    }

  };

  const loadLowStock = async () => {

    try {

      const data = await getLowStock();

      setLowStockCount(data.length);

    } catch (error) {

      console.log(error);

    }

  };

  const handleStockIn = (row) => {

    setSelectedItem(row);

    setStockInOpen(true);

  };

  const handleStockOut = (row) => {

    setSelectedItem(row);

    setStockOutOpen(true);

  };

  const saveStockIn = async (qty) => {

    try {

      await stockIn(selectedItem.id, qty);

      setSnackbar({

        open: true,

        message: "Stock Added Successfully",

        severity: "success",

      });

      setStockInOpen(false);

      loadInventory();

      loadLowStock();

    } catch (error) {

      console.log(error);

    }

  };

  const saveStockOut = async (qty) => {

    try {

      await stockOut(selectedItem.id, qty);

      setSnackbar({

        open: true,

        message: "Stock Removed Successfully",

        severity: "success",

      });

      setStockOutOpen(false);

      loadInventory();

      loadLowStock();

    } catch (error) {

      console.log(error);

    }

  };

  const filteredInventory = inventory.filter((item) =>

    `${item.productName} ${item.categoryName}`

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
          Inventory
        </Typography>

        <LowStockCard count={lowStockCount} />

        <InventoryToolbar
          search={search}
          setSearch={setSearch}
        />

        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            height: 550,
          }}
        >
          <InventoryTable
            inventory={filteredInventory}
            onStockIn={handleStockIn}
            onStockOut={handleStockOut}
          />
        </Paper>

        <StockInDialog
          open={stockInOpen}
          onClose={() => setStockInOpen(false)}
          onSave={saveStockIn}
        />

        <StockOutDialog
          open={stockOutOpen}
          onClose={() => setStockOutOpen(false)}
          onSave={saveStockOut}
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

export default Inventory;