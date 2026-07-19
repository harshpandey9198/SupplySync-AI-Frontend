import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const activities = [
  {
    icon: <ShoppingCartIcon />,
    color: "#2563eb",
    title: "Purchase Order Created",
    subtitle: "PO-1005 • Today 10:25 AM",
  },
  {
    icon: <Inventory2Icon />,
    color: "#10b981",
    title: "Laptop Stock Updated",
    subtitle: "+15 Units Added",
  },
  {
    icon: <LocalShippingIcon />,
    color: "#9333ea",
    title: "Supplier Added",
    subtitle: "Dell India Pvt Ltd",
  },
  {
    icon: <WarningAmberIcon />,
    color: "#ef4444",
    title: "Low Stock Alert",
    subtitle: "Rice 5KG (Only 5 Left)",
  },
];

function RecentActivity() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        height: 420,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        Recent Activity
      </Typography>

      <List>
        {activities.map((item, index) => (
          <div key={index}>
            <ListItem disablePadding sx={{ py: 1.2 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: item.color,
                  }}
                >
                  {item.icon}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={item.title}
                secondary={item.subtitle}
              />
            </ListItem>

            {index !== activities.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </Paper>
  );
}

export default RecentActivity;