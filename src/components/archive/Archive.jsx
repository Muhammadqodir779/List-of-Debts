import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import UserList from "./UserList";

export default function Archive({ archivedUsers }) {
  return (
    <Paper
      sx={{
        mt: 4,
        p: { xs: 2, sm: 3 },
        width: "100%",
        overflowX: "auto", // 📱 kichik ekranlarda scroll chiqadi
      }}
      data-aos="fade-up"
    >
      <Box
        sx={{
          mb: 2,
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1.1rem", sm: "1.3rem" },
            fontWeight: "bold",
          }}
        >
          📂 Arxivlangan qarzdorlar
        </Typography>
      </Box>

      <UserList users={archivedUsers} isArchive={true} />
    </Paper>
  );
}
