import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Candy Name"
            variant="outlined"
            id="candyName"
            name="candyName"
            value={formData.candyName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Quantity"
            variant="outlined"
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
          >
            Add Item
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default CandyForm;
