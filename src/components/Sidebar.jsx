import {
  LayoutDashboard,
  Package,
  Tags,
  Truck,
  Warehouse,
  ShoppingCart,
  Receipt,
  Bot,
  FileText,
  History,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Products", icon: <Package size={20} />, path: "/products" },
    { name: "Categories", icon: <Tags size={20} />, path: "/categories" },
    { name: "Suppliers", icon: <Truck size={20} />, path: "/suppliers" },
    { name: "Warehouses", icon: <Warehouse size={20} />, path: "/warehouses" },
    { name: "Purchase Orders", icon: <ShoppingCart size={20} />, path: "/purchase-orders" },
    { name: "Sales Orders", icon: <Receipt size={20} />, path: "/sales-orders" },
    { name: "Inventory", icon: <Package size={20} />, path: "/inventory" },
    { name: "Stock Movement", icon: <History size={20} />, path: "/stock-movement" },
    { name: "AI Assistant", icon: <Bot size={20} />, path: "/ai" },
    { name: "Reports", icon: <FileText size={20} />, path: "/reports" },
  ];

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        width: "250px",
        height: "100vh",
        background: "linear-gradient(180deg,#0f172a,#1e293b)",
        color: "white",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0,
        overflowY: "auto",
        boxShadow: "5px 0 25px rgba(0,0,0,.25)",
      }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          marginBottom: "40px",
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        🚀 SupplySync AI
      </motion.h2>

      {menus.map((menu) => (
        <Link
          key={menu.path}
          to={menu.path}
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <motion.div
            whileHover={{
              scale: 1.04,
              x: 8,
            }}
            whileTap={{
              scale: 0.96,
            }}
            transition={{
              duration: 0.2,
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 18px",
              marginBottom: "10px",
              borderRadius: "12px",
              cursor: "pointer",
              background:
                location.pathname === menu.path
                  ? "linear-gradient(90deg,#2563eb,#3b82f6)"
                  : "transparent",
              boxShadow:
                location.pathname === menu.path
                  ? "0 8px 20px rgba(37,99,235,.35)"
                  : "none",
              transition: "0.3s",
            }}
          >
            {menu.icon}

            <span
              style={{
                fontWeight:
                  location.pathname === menu.path ? "600" : "400",
              }}
            >
              {menu.name}
            </span>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
};

export default Sidebar;