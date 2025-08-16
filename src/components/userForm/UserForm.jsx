import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function UserForm({ addUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !amount.trim()) return;

    addUser({
      name: firstName,
      surname: lastName,
      amount: parseFloat(amount),
      phone,
      date: new Date().toISOString().split("T")[0],
    });

    setFirstName("");
    setLastName("");
    setAmount("");
    setPhone("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mb: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "850px",
        maxWidth: "100%",
        mx: "auto",
        p: 2,
      }}
    >
      <TextField
        label="Ism"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Familiya"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Telefon raqam"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+998901234567"
        fullWidth
      />
      <TextField
        label="Qarz summasi"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        required
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ height: "50px" }}
      >
        Qo‘shish
      </Button>
    </Box>
  );
}
