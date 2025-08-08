import React from "react";
import { Typography, Paper } from "@mui/material";

export default function TotalDebt({ users }) {
  const total = users.reduce((sum, u) => sum + (parseFloat(u.debt) || 0), 0);

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6" align="center">
        Umumiy qarz: {total} so‘m
      </Typography>
    </Paper>
  );
}
