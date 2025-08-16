import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function TotalDebt({ users }) {
  const total = users.reduce((acc, user) => acc + (user.amount || 0), 0);

  return (
    <Card
      sx={{
        mt: 3,
        width: "100%",
        p: { xs: 1, sm: 2 },
      }}
      data-aos="fade-up"
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // 📱 phone-da column
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            Umumiy qarzdorlik
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: { xs: "1.1rem", sm: "1.4rem" } }}
            color="error"
          >
            {total.toLocaleString()} so‘m
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
