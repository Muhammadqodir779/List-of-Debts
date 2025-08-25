import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import {
  Close,
  Menu,
  People,
  Archive,
  Inventory,
  ListAlt,
  Today,
  DateRange,
  CalendarMonth,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const menuItems = [
  { key: "mahsulot", icon: <Inventory />, text: "Mahsulot" },
  { key: "arxiv", icon: <Archive />, text: "Arxiv" },
  { key: "qarzdorlar", icon: <People />, text: "Qarzdorlar" },
  { key: "mahsulotlar", icon: <ListAlt />, text: "Mahsulotlar" },
  { key: "kunlik", icon: <Today />, text: "Kunlik savdo" },
  { key: "oylik", icon: <DateRange />, text: "Oylik savdo" },
  { key: "yillik", icon: <CalendarMonth />, text: "Yillik savdo" },
];

export default function Sidebar({ currentPage, setCurrentPage }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Mobile uchun och/yopish
  const [mobileOpen, setMobileOpen] = useState(false);

  // Desktop uchun keng/tor bo'lish
  const [desktopOpen, setDesktopOpen] = useState(true);

  const drawerContent = (
    <Box sx={{ width: desktopOpen || isMobile ? 240 : 60 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" p={1}>
        {desktopOpen && <Typography variant="h6">Menu</Typography>}
        <IconButton
          onClick={() =>
            isMobile ? setMobileOpen(false) : setDesktopOpen(!desktopOpen)
          }
        >
          {isMobile ? <Close /> : desktopOpen ? <Close /> : <Menu />}
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.key}
            selected={currentPage === item.key}
            onClick={() => {
              setCurrentPage(item.key);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{ "&.Mui-selected": { backgroundColor: "#e0f7fa" } }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {(desktopOpen || isMobile) && <ListItemText primary={item.text} />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobil ekranda hamburger tugma */}
      {isMobile && !mobileOpen && (
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{ position: "fixed", top: 16, left: 16, zIndex: 2000 }}
        >
          <Menu />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: desktopOpen ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: desktopOpen || isMobile ? 240 : 60,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
