import React, { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Typography, Box } from "@mui/material";
import { Close, Menu, People, Archive, Inventory, ListAlt, Today, DateRange, CalendarMonth } from "@mui/icons-material";

const menuItems = [
  { key: "mahsulot", icon: <Inventory />, text: "Mahsulot" },
  { key: "arxiv", icon: <Archive />, text: "Arxiv" },
  { key: "qarzdorlar", icon: <People />, text: "Qarzdorlar" },
  { key: "mahsulotlar", icon: <ListAlt />, text: "Mahsulotlar" },
  { key: "kunlik", icon: <Today />, text: "Kunlik savdo" },
  { key: "oylik", icon: <DateRange />, text: "Oylik savdo" },
  { key: "yillik", icon: <CalendarMonth />, text: "Yillik savdo" }
];

export default function Sidebar({ currentPage, setCurrentPage }) {
  const [open, setOpen] = useState(true);

  return (
    <Drawer variant="permanent" open={open}
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 60,
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" p={1}>
        {open && <Typography variant="h6">📋 Mening Panelim</Typography>}
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <Close /> : <Menu />}
        </IconButton>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.key}
            selected={currentPage === item.key}
            onClick={() => setCurrentPage(item.key)}
            sx={{ "&.Mui-selected": { backgroundColor: "#e0f7fa" } }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {open && <ListItemText primary={item.text} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
