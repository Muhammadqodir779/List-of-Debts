import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";

export default function SalesStats({ users, type }) {
  const groupData = () => {
    const dataMap = {};

    users.forEach((u) => {
      const date = new Date(u.date);

      let key;
      if (type === "kunlik") {
        key = date.toLocaleDateString("uz-UZ");
      } else if (type === "oylik") {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      } else if (type === "yillik") {
        key = `${date.getFullYear()}`;
      }

      if (!dataMap[key]) {
        dataMap[key] = 0;
      }
      dataMap[key] += parseFloat(u.amount || 0);
    });

    return {
      labels: Object.keys(dataMap),
      values: Object.values(dataMap),
    };
  };

  const { labels, values } = groupData();

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Sotuv statistikasi ({type})
      </Typography>
      <LineChart
        xAxis={[{ scaleType: "point", data: labels }]}
        series={[
          { data: values, label: "Umumiy summa (so‘m)", color: "#1976d2" }
        ]}
        height={300}
      />
    </div>
  );
}
