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
  Box
} from "@mui/material";

export default function ProductList({ products, editProduct, deleteProduct }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TableContainer component={Paper} sx={{ mt: 3, p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Mahsulotlar ro‘yxati</Typography>
        <TextField
          label="Qidirish"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

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
  );
}
