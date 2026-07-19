import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { motion } from "framer-motion";
import CountUp from "react-countup";

function DashboardCard({
  title,
  value,
  icon,
  color,
}) {

  // Agar value ₹5000 jaisi ho to number nikal lo
  const numericValue =
    typeof value === "string"
      ? Number(value.replace(/[^\d.]/g, ""))
      : Number(value);

  const isCurrency =
    typeof value === "string" && value.includes("₹");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
    >
      <Card
        sx={{
          borderRadius: 5,
          overflow: "hidden",
          cursor: "pointer",
          background:
            "linear-gradient(135deg,#ffffff,#f8fafc)",
          border: "1px solid rgba(255,255,255,.35)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 12px 30px rgba(0,0,0,.08)",

          "&:hover": {
            boxShadow:
              "0 20px 45px rgba(37,99,235,.18)",
          },
        }}
      >
        <CardContent>

          {/* Top Section */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >

            <Box>

              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                {title}
              </Typography>

              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
              >
                
              </motion.div>

            </Box>

            <motion.div
              whileHover={{
                rotate: 12,
                scale: 1.15,
              }}
            >
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: "20px",
                  background: color,
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 30,
                  boxShadow: `0 10px 25px ${color}55`,
                }}
              >
                {icon}
              </Box>
            </motion.div>

          </Box>

          {/* Progress */}

          <LinearProgress
            variant="determinate"
            value={80}
            sx={{
              mt: 3,
              height: 8,
              borderRadius: 20,
              background: "#e2e8f0",

              "& .MuiLinearProgress-bar": {
                background: color,
                borderRadius: 20,
              },
            }}
          />

          {/* Bottom */}

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >

            <Typography
              sx={{
                color: "#64748b",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              This Month
            </Typography>

            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.5,
              }}
            >
              <Typography
                sx={{
                  color: "#16a34a",
                  fontWeight: "bold",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TrendingUpIcon
                  sx={{
                    fontSize: 18,
                    mr: 0.5,
                  }}
                />
                +18%
              </Typography>
            </motion.div>

          </Box>

        </CardContent>
      </Card>
    </motion.div>
  );
}

export default DashboardCard;