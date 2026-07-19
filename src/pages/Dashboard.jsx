import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";

import {
  getDashboardStats,
  getRecentOrders,
  getAnalytics,
} from "../services/dashboardService";

import {
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

import { motion } from "framer-motion";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import SalesChart from "../components/dashboard/SalesChart";
import InventoryPieChart from "../components/dashboard/InventoryPieChart";
import RecentOrders from "../components/dashboard/RecentOrders";
import RecentActivity from "../components/dashboard/RecentActivity";

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const statsData = await getDashboardStats();
      setStats(statsData);

      const ordersData = await getRecentOrders();
      setOrders(Array.isArray(ordersData) ? ordersData : []);

      const analyticsData = await getAnalytics();
      setAnalytics(analyticsData.monthly || []);

      

    } catch (err) {
      const statsData = await getDashboardStats();

console.log("Dashboard API Response:", statsData);

setStats(statsData);
      console.log(err);
    }
  };

  if (!stats) {
    return (
      <MainLayout>
        <Navbar />

        <Typography variant="h5">
          Loading...
        </Typography>

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <Navbar />

      {/* HEADER */}

      <motion.div
        initial={{
          opacity: 0,
          y: -40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: .6,
        }}
      >

        <Box mb={5}>

          <Typography
            variant="h3"
            fontWeight="bold"
          >
            Dashboard
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >
            Live overview of inventory, sales and warehouse performance.
          </Typography>

        </Box>

      </motion.div>

      {/* CARDS */}

      <Grid
        container
        spacing={3}
        mb={5}
      >

        <Grid size={{ xs:12, sm:6, md:3 }}>
          <DashboardCard
            title="Products"
            value={stats.totalProducts}
            icon={<Inventory2Icon />}
            color="#2563eb"
          />
        </Grid>

        <Grid size={{ xs:12, sm:6, md:3 }}>
          <DashboardCard
            title="Categories"
            value={stats.totalCategories}
            icon={<Inventory2Icon />}
            color="#7c3aed"
          />
        </Grid>

        <Grid size={{ xs:12, sm:6, md:3 }}>
          <DashboardCard
            title="Suppliers"
            value={stats.totalSuppliers}
            icon={<LocalShippingIcon />}
            color="#16a34a"
          />
        </Grid>

        <Grid size={{ xs:12, sm:6, md:3 }}>
          <DashboardCard
            title="Warehouses"
            value={stats.totalWarehouses}
            icon={<WarehouseIcon />}
            color="#f97316"
          />
        </Grid>

        <Grid size={{ xs:12, sm:6, md:3 }}>
          <DashboardCard
            title="Purchase Orders"
            value={stats.totalPurchaseOrders}
            icon={<ShoppingCartIcon />}
            color="#9333ea"
          />
        </Grid>

        <Grid size={{ xs:12, sm:6, md:3 }}>
          <DashboardCard
            title="Sales Orders"
            value={stats.totalSalesOrders}
            icon={<ShoppingCartIcon />}
            color="#0f766e"
          />
        </Grid>

        <Grid size={{ xs:12, sm:6, md:3 }}>
          <DashboardCard
            title="Low Stock"
            value={stats.lowStockProducts}
            icon={<WarningAmberIcon />}
            color="#dc2626"
          />
        </Grid>

        <Grid size={{ xs:12, sm:6, md:3 }}>
          <DashboardCard
            title="Purchase Amount"
            value={`₹${stats.totalPurchaseAmount}`}
            icon={<CurrencyRupeeIcon />}
            color="#2563eb"
          />
        </Grid>

        <Grid size={{ xs:12, sm:6, md:3 }}>
          <DashboardCard
            title="Sales Amount"
            value={`₹${stats.totalSalesAmount}`}
            icon={<CurrencyRupeeIcon />}
            color="#059669"
          />
        </Grid>
              </Grid>

      {/* ================= CHART SECTION ================= */}

      <Grid container spacing={3} mb={5}>

        <Grid size={{ xs: 12, lg: 8 }}>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <Paper
              sx={{
                p: 3,
                borderRadius: 5,
                height: 430,
                background: "rgba(255,255,255,.85)",
                backdropFilter: "blur(15px)",
                boxShadow: "0 15px 40px rgba(0,0,0,.08)",
              }}
            >

              <Typography
                variant="h6"
                fontWeight="bold"
                mb={3}
              >
                📈 Sales & Purchase Analytics
              </Typography>

              <SalesChart data={analytics} />

            </Paper>

          </motion.div>

        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .6 }}
            viewport={{ once: true }}
          >

            <Paper
              sx={{
                p: 3,
                borderRadius: 5,
                height: 430,
                background: "rgba(255,255,255,.85)",
                backdropFilter: "blur(15px)",
                boxShadow: "0 15px 40px rgba(0,0,0,.08)",
              }}
            >

              <Typography
                variant="h6"
                fontWeight="bold"
                mb={3}
              >
                📦 Inventory Distribution
              </Typography>

              <InventoryPieChart />

            </Paper>

          </motion.div>

        </Grid>

      </Grid>

      {/* ================= RECENT ORDERS + AI ================= */}

      <Grid container spacing={3} mb={5}>

        {/* Recent Orders */}

        <Grid size={{ xs: 12, lg: 8 }}>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
            viewport={{ once: true }}
          >

            <Paper
              sx={{
                p: 3,
                borderRadius: 5,
                boxShadow: "0 15px 40px rgba(0,0,0,.08)",
              }}
            >

              <Typography
                variant="h6"
                fontWeight="bold"
                mb={3}
              >
                🛒 Recent Purchase Orders
              </Typography>

              <RecentOrders orders={orders} />

            </Paper>

          </motion.div>

        </Grid>

        {/* AI Recommendation */}

        <Grid size={{ xs: 12, lg: 4 }}>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
          >

            <Paper
              sx={{
                p: 3,
                borderRadius: 5,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background:
                  "linear-gradient(135deg,#ffffff,#eef6ff)",
                boxShadow: "0 15px 40px rgba(0,0,0,.08)",
              }}
            >

              <Box>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mb={3}
                >
                  🤖 AI Recommendation
                </Typography>

                <Paper
                  sx={{
                    p: 2,
                    bgcolor: "#eef6ff",
                    borderRadius: 3,
                    mb: 2,
                  }}
                >

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >

                    <AutoAwesomeIcon color="primary" />

                    <Typography fontWeight="bold">
                      Stock Prediction
                    </Typography>

                  </Box>

                  <Typography
                    mt={1}
                    color="text.secondary"
                  >
                    Laptop stock is selling fast.
                    Consider placing a purchase order.
                  </Typography>

                </Paper>

                <Paper
                  sx={{
                    p: 2,
                    bgcolor: "#ecfdf5",
                    borderRadius: 3,
                  }}
                >

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >

                    <TrendingUpIcon color="success" />

                    <Typography fontWeight="bold">
                      Sales Insight
                    </Typography>

                  </Box>

                  <Typography
                    mt={1}
                    color="text.secondary"
                  >
                    Electronics category sales have increased by
                    18% this month.
                  </Typography>

                </Paper>

              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography
                color="primary"
                fontWeight="bold"
              >
                🚀 AI Module Coming Soon
              </Typography>

            </Paper>

          </motion.div>

        </Grid>

      </Grid>
            {/* ================= RECENT ACTIVITY ================= */}

      <Grid container spacing={3}>

        <Grid size={{ xs: 12 }}>

          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            viewport={{
              once: true,
            }}
          >

            <Paper
              sx={{
                p: 3,
                borderRadius: 5,
                background:
                  "linear-gradient(135deg,#ffffff,#f8fafc)",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,.08)",
              }}
            >

              <Typography
                variant="h6"
                fontWeight="bold"
                mb={3}
              >
                📋 Recent Activity
              </Typography>

              <RecentActivity />

            </Paper>

          </motion.div>

        </Grid>

      </Grid>

    </MainLayout>
  );
}

export default Dashboard;