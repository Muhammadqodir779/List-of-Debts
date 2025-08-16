import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesStats({ products }) {
  // 🔹 Mahsulotlar statistikasi
  const data = products.map((p) => ({
    name: p.name,
    total: p.price * p.quantity,
  }));

  return (
    <Card
      sx={{
        mt: 4,
        p: { xs: 1, sm: 2 },
        width: "100%",
        overflowX: "auto", // 📱 agar grafik katta bo‘lsa scroll chiqadi
      }}
      data-aos="fade-up"
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textAlign: { xs: "center", sm: "left" },
            fontSize: { xs: "1rem", sm: "1.2rem" },
            fontWeight: "bold",
          }}
        >
          📊 Mahsulotlar statistikasi
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: { xs: 250, sm: 350 }, // 📱 telefon kichkina, PC katta grafik
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-30}
                textAnchor="end"
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#1976d2" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
