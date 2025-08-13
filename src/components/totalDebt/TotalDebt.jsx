import React from "react";
import { Typography, Paper } from "@mui/material";

export default function TotalDebt({ users }) {
  const total = users.reduce((sum, u) => sum + (parseFloat(u.debt) || 0), 0);
  // 1. reduce – massivdagi elementlar ustida jamlash (summa olish) operatsiyasi.
  // 2. sum – yig‘ilayotgan jami.
  // 3. u – hozirgi foydalanuvchi.
  // 4. parseFloat(u.debt) – debt qiymatini raqamga aylantiradi (string bo‘lsa ham).
  // 5. || 0 – agar debt noto‘g‘ri yoki null bo‘lsa, uni 0 deb oladi.
  // 6. 0 – reduce’ning boshlang‘ich qiymati.
  // Natija barcha foydalanuvchilarning qarzlarini jamlab, total o‘zgaruvchisiga saqlaydi.

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6" align="center">
        Umumiy qarz: {total} so‘m
      </Typography>
    </Paper>
  );
}
