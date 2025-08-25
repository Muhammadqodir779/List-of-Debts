import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Divider,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function ProductList({ products, editProduct, deleteProduct }) {
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // kichik ekran

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ mt: 3 }}>
      {/* Title va Search */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "stretch" : "center",
          gap: 2,
          mb: 2
        }}
      >
        <Typography variant="h6" sx={{ textAlign: isMobile ? "center" : "left" }}>
          Mahsulotlar ro‘yxati
        </Typography>
        <TextField
          label="Qidirish"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: isMobile ? "100%" : "250px" }}
        />
      </Box>

      {/* Desktopda Table, Mobileda Card */}
      {!isMobile ? (
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Mahsulot nomi</TableCell>
                <TableCell>Narxi (so'm)</TableCell>
                <TableCell>Soni</TableCell>
                <TableCell>Umumiy qiymat</TableCell>
                <TableCell>Amallar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price.toLocaleString()}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      {(product.price * product.quantity).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => editProduct(product)}
                      >
                        Tahrirlash
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => deleteProduct(product.id)}
                      >
                        O‘chirish
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Mahsulotlar yo‘q
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // 📱 Mobile: Card holati
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <Card key={product.id} variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    № {index + 1}
                  </Typography>
                  <Typography variant="h6">{product.name}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography>Narxi: {product.price.toLocaleString()} so‘m</Typography>
                  <Typography>Soni: {product.quantity}</Typography>
                  <Typography>
                    Umumiy qiymat:{" "}
                    <b>{(product.price * product.quantity).toLocaleString()} so‘m</b>
                  </Typography>
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => editProduct(product)}
                    >
                      Tahrirlash
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => deleteProduct(product.id)}
                    >
                      O‘chirish
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography align="center">Mahsulotlar yo‘q</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
