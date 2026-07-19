import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";

import { getDashboardReport } from "../services/reportService";

function Reports() {

  const [report, setReport] = useState({

    totalProducts: 0,

    totalPurchaseOrders: 0,

    totalSalesOrders: 0,

    lowStockProducts: 0,

  });

  useEffect(() => {

    loadReport();

  }, []);

  const loadReport = async () => {

    try {

      const data = await getDashboardReport();

      setReport(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <MainLayout>

      <Navbar />

      <Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          Reports Dashboard
        </Typography>

        <Grid
          container
          spacing={3}
        ></Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="h6">
                Total Products
              </Typography>

              <Typography
                variant="h3"
                color="primary"
                fontWeight="bold"
              >
                {report.totalProducts}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="h6">
                Purchase Orders
              </Typography>

              <Typography
                variant="h3"
                color="success.main"
                fontWeight="bold"
              >
                {report.totalPurchaseOrders}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="h6">
                Sales Orders
              </Typography>

              <Typography
                variant="h3"
                color="secondary"
                fontWeight="bold"
              >
                {report.totalSalesOrders}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: "center",
                backgroundColor: "#ef4444",
                color: "#fff",
              }}
            >
              <Typography variant="h6">
                Low Stock Products
              </Typography>

              <Typography
                variant="h3"
                fontWeight="bold"
              >
                {report.lowStockProducts}
              </Typography>
            </Paper>
          </Grid>

       

      </Box>

    </MainLayout>
  );
}

export default Reports;