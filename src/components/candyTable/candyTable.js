import React from "react";

function CandyTable({ candyData, updateCandiesQuantity, URL }) {
  const buyOneHandler = (event) => {
    event.preventDefault();
    const candy_id = event.target.parentElement.parentElement.id;
    updateCandiesQuantity(URL, 1, candy_id);
  };
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
        {candyData.map((candy) => (
          <tr key={candy._id} id={candy._id}>
            <td>{candy.candyName}</td>
            <td>{candy.description}</td>
            <td>${candy.price}</td>
            <td>{candy.quantity}</td>
            <td>
              <button onClick={buyOneHandler}>BuyOne</button>
            </td>
            <td>
              <button>Buy2</button>
            </td>
            <td>
              <button>Buy3</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CandyTable;
