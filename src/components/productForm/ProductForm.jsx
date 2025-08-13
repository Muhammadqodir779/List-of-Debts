import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function ProductForm({ addProduct, editingProduct, saveProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setQuantity(editingProduct.quantity);
    } else {
      setName("");
      setPrice("");
      setQuantity("");
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name,
      price: Number(price),
      quantity: Number(quantity),
    };
    if (editingProduct) {
      saveProduct(productData);
    } else {
      addProduct(productData);
    }
    setName("");
    setPrice("");
    setQuantity("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, flexDirection: "column", mt: 2 }}>
      <TextField
        label="Mahsulot nomi"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Narxi"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <TextField
        label="Soni"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">
        {editingProduct ? "Saqlash" : "Qo‘shish"}
      </Button>
    </Box>
  );
}
