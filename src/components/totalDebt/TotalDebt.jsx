import React from "react";
import { Typography, Paper } from "@mui/material";

export default function TotalDebt({ users }) {
  // Barcha qarzlarni yig‘ish
  const total = users.reduce((sum, u) => sum + (parseFloat(u.amount) || 0), 0);

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6" align="center">
        Umumiy qarz: {total.toLocaleString()} so‘m
      </Typography>
    </Paper>
  );
}
