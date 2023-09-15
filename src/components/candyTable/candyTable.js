import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

function CandyTable({ candyData, updateCandiesQuantity, URL }) {
  const buyHandler = (event, amount) => {
    event.preventDefault();
    const candy_id = event.currentTarget.parentElement.parentElement.id;
    updateCandiesQuantity(URL, amount, candy_id);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Candy Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candyData.map((candy) => (
            <TableRow key={candy._id} id={candy._id}>
              <TableCell>{candy.candyName}</TableCell>
              <TableCell>{candy.description}</TableCell>
              <TableCell>${candy.price}</TableCell>
              <TableCell>{candy.quantity}</TableCell>
              <TableCell
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => buyHandler(e, 1)}
                >
                  Buy One
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => buyHandler(e, 2)}
                  disabled={candy.quantity < 2}
                >
                  Buy Two
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => buyHandler(e, 3)}
                  disabled={candy.quantity < 3}
                >
                  Buy Three
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CandyTable;
