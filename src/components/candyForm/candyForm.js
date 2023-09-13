import React, { useState } from "react";

function CandyForm({ onAddCandy }) {
  const [formData, setFormData] = useState({
    candyName: "",
    description: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCandy(formData);
    setFormData({
      candyName: "",
      description: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="candyName">Candy Name:</label>
      <input
        type="text"
        id="candyName"
        name="candyName"
        value={formData.candyName}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Item</button>
    </form>
  );
}

export default CandyForm;
