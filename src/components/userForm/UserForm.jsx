import React, { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { v4 as uuidv4 } from "uuid"; // har yangi foydalanuvchiga noyob id berish uchun.

export default function UserForm({ addUser, editingUser, updateUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [debt, setDebt] = useState(""); // Har bir input uchun alohida state bor: ism, familiya, telefon, qarz.

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
  }, [editingUser]); // Agar editingUser bo‘lsa (ya’ni foydalanuvchi tahrirlanayotgan bo‘lsa), formaga o‘sha foydalanuvchining ma’lumotlarini yozadi.
  // Agar editingUser yo‘q bo‘lsa, formani bo‘sh holatga qaytaradi.

  const handleSubmit = (e) => {
    e.preventDefault(); // sahifani qayta yuklashdan saqlaydi

    // Agar biror input bo‘sh bo‘lsa
    if (!firstName || !lastName || !phone || !debt) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    if (editingUser) {
      // Tahrirlash rejimi
      updateUser({
        ...editingUser,
        firstName,
        lastName,
        phone,
        debt: parseFloat(debt), // raqamga aylantirish
      });
    } else {
      // Yangi foydalanuvchi qo‘shish
      addUser({
        id: uuidv4(),
        firstName,
        lastName,
        phone,
        debt: parseFloat(debt),
      });
    }

    // Formani tozalash
    setFirstName("");
    setLastName("");
    setPhone("");
    setDebt("");
  };

  // Xulosa: 1. Tahrirlash bo‘lsa – updateUser chaqiriladi.
  // 2. Yangi foydalanuvchi bo‘lsa – addUser chaqiriladi.
  // 3. Ma’lumotlar App.js’dagi users state’iga uzatiladi.

  // Qisqasi: UserForm — bu foydalanuvchi qo‘shish yoki tahrirlash uchun ishlatiladigan forma.
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
