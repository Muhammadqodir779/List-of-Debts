// src/components/UserList.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Card,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function UserList({ users, deleteUser, startEditUser }) {
  const isMobile = useMediaQuery("(max-width:768px)");

  if (isMobile) {
    // 📱 Mobile ko‘rinishi
    return (
      <Box display="flex" flexDirection="column" gap={2}>
        {users.length > 0 ? (
          users.map((user) => (
            <Card key={user.id}>
              <CardContent>
                <Typography variant="h6">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2">📞 {user.phone}</Typography>
                <Typography variant="body2">💰 {user.debt} so'm</Typography>

                <Box mt={1}>
                  <IconButton
                    color="primary"
                    onClick={() => startEditUser(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography align="center">Ma’lumot yo‘q</Typography>
        )}
      </Box>
    );
  }

  // 💻 Desktop ko‘rinishi (jadval)
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ism</TableCell>
            <TableCell>Familiya</TableCell>
            <TableCell>Telefon</TableCell>
            <TableCell>Qarz</TableCell>
            <TableCell align="center">Amallar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.debt} so'm</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => startEditUser(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Ma’lumot yo‘q
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
