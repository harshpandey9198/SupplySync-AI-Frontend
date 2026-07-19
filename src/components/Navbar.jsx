import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Badge,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

import { motion } from "framer-motion";

function Navbar() {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <motion.div
      initial={{
        y: -60,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: .6,
      }}
    >

      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "rgba(255,255,255,.75)",
          backdropFilter: "blur(18px)",
          color: "#111827",
          borderRadius: 4,
          mb: 4,
          border: "1px solid rgba(255,255,255,.4)",
          boxShadow: "0 15px 35px rgba(0,0,0,.08)",
        }}
      >

        <Toolbar>

          <Box flex={1}>

            <motion.div
              initial={{
                x: -30,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                delay: .2,
              }}
            >

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                Good Morning, Harsh 👋
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {today}
              </Typography>

            </motion.div>

          </Box>

          {/* Search */}

          <motion.div
            whileHover={{
              scale: 1.15,
              rotate: 15,
            }}
            whileTap={{
              scale: .9,
            }}
          >

            <IconButton>

              <SearchIcon />

            </IconButton>

          </motion.div>

          {/* Notification */}

          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 5,
              duration: .7,
            }}
          >

            <IconButton>

              <Badge
                badgeContent={3}
                color="error"
              >
                <NotificationsIcon />
              </Badge>

            </IconButton>

          </motion.div>

          {/* Avatar */}

          <motion.div
            whileHover={{
              scale: 1.15,
              rotate: 8,
            }}
            whileTap={{
              scale: .95,
            }}
          >

            <Avatar
              sx={{
                ml: 2,
                width: 46,
                height: 46,
                bgcolor: "#2563eb",
                fontWeight: "bold",
                boxShadow:
                  "0 10px 25px rgba(37,99,235,.35)",
              }}
            >
              H
            </Avatar>

          </motion.div>

        </Toolbar>

      </AppBar>

    </motion.div>

  );

}

export default Navbar;