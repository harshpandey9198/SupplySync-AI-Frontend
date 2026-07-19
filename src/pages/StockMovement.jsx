import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";

import StockMovementToolbar from "../components/stockMovement/StockMovementToolbar";
import StockMovementTable from "../components/stockMovement/StockMovementTable";

import { getStockMovements } from "../services/stockMovementService";

function StockMovement() {

  const [movements, setMovements] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMovements();
  }, []);

  const loadMovements = async () => {
    try {
      const data = await getStockMovements();
      setMovements(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredMovements = movements.filter((movement) => {

    const productName = movement.product?.name || "";

    return `${productName} ${movement.movementType}`
      .toLowerCase()
      .includes(search.toLowerCase());

  });

  return (
    <MainLayout>

      <Navbar />

      <Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          Stock Movement History
        </Typography>

        <StockMovementToolbar
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
          <StockMovementTable
            movements={filteredMovements}
          />
        </Paper>

      </Box>

    </MainLayout>
  );
}

export default StockMovement;