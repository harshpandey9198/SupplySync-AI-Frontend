import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
} from "@mui/material";

function StockMovementTable({ movements }) {

  return (

    <TableContainer sx={{ maxHeight: 520 }}>

      <Table stickyHeader>

        <TableHead>

          <TableRow>

            <TableCell>
              <b>Product</b>
            </TableCell>

            <TableCell>
              <b>Movement</b>
            </TableCell>

            <TableCell>
              <b>Quantity</b>
            </TableCell>

            <TableCell>
              <b>Remarks</b>
            </TableCell>

            <TableCell>
              <b>Date</b>
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {movements.map((movement) => (

            <TableRow
              key={movement.id}
              hover
            >

              <TableCell>

                <Typography fontWeight="bold">

                  {movement.product?.name}

                </Typography>

              </TableCell>

              <TableCell>

                <Chip

                  label={movement.movementType}
                                    color={
                    movement.movementType === "STOCK_IN"
                      ? "success"
                      : "error"
                  }
                  variant="filled"
                />

              </TableCell>

              <TableCell>

                {movement.quantity}

              </TableCell>

              <TableCell>

                {movement.remarks}

              </TableCell>

              <TableCell>

                {
                  movement.movementDate
                    ? new Date(
                        movement.movementDate
                      ).toLocaleString()
                    : "-"
                }

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </TableContainer>

  );

}

export default StockMovementTable;