import React from "react";
import { TextField } from "@mui/material";

export default function SearchBar({ setSearchTerm }) {
  return (
    <TextField
      label="Qidirish..."
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
    />
  );
  // Natija: Foydalanuvchi yozgan so‘z state’ga o‘tadi va keyinchalik filtering yoki qidiruv uchun ishlatiladi.

}
