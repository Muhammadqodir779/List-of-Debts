import React, { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function UserForm({ addUser, editingUser, updateUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [debt, setDebt] = useState("");

  useEffect(() => {
    if (editingUser) {
      setFirstName(editingUser.firstName);
      setLastName(editingUser.lastName);
      setPhone(editingUser.phone);
      setDebt(editingUser.debt);
    } else {
      setFirstName("");
      setLastName("");
      setPhone("");
      setDebt("");
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !debt) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    if (editingUser) {
      updateUser({
        ...editingUser,
        firstName,
        lastName,
        phone,
        debt: parseFloat(debt),
      });
    } else {
      addUser({
        id: uuidv4(),
        firstName,
        lastName,
        phone,
        debt: parseFloat(debt),
      });
    }

    setFirstName("");
    setLastName("");
    setPhone("");
    setDebt("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <TextField
          label="Ism"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Familiya"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Telefon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />
        <TextField
          label="Qarz"
          type="number"
          value={debt}
          onChange={(e) => setDebt(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          {editingUser ? "Yangilash" : "Qo‘shish"}
        </Button>
      </Stack>
    </form>
  );
}
