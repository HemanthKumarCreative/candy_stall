import React from "react";

function CandyTable({ candyData }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Candy Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {candyData.map((candy, index) => (
          <tr key={index}>
            <td>{candy.candyName}</td>
            <td>{candy.description}</td>
            <td>${candy.price}</td>
            <td>{candy.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CandyTable;
