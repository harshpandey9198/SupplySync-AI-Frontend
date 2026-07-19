import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

function RecentOrders({ orders = [] }) {
  return (
    <TableContainer>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell><b>Order ID</b></TableCell>
            <TableCell><b>Customer</b></TableCell>
            <TableCell><b>Amount</b></TableCell>
            <TableCell><b>Status</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No Orders Found
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} hover>

                <TableCell>
                  #{order.id}
                </TableCell>

                <TableCell>
                  {order.customerName}
                </TableCell>

                <TableCell>
                  ₹{order.totalAmount}
                </TableCell>

                <TableCell>

                  <Chip
                    label={order.status}
                    color={
                      order.status === "Completed"
                        ? "success"
                        : order.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                    size="small"
                  />

                </TableCell>

              </TableRow>
            ))
          )}

        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default RecentOrders;