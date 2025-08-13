import React, { useState } from "react";
import { TextField, Button, Paper, Box } from "@mui/material";

export default function ProductForm({ addProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.quantity) return;

    addProduct({
      name: form.name,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity, 10)
    });

    setForm({ name: "", price: "", quantity: "" });
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
      >
        <TextField
          label="Mahsulot nomi"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Narxi (so'm)"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Soni"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Qo‘shish
        </Button>
      </Box>
    </Paper>
  );
}
