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
}
