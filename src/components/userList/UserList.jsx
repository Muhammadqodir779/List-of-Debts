import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  Box,
  Paper,
  Typography,
  TableContainer
} from "@mui/material";
import { Edit, Delete, Save, Close } from "@mui/icons-material";

export default function UserList({ users, editUser, deleteUser, isArchive = false }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    surname: "",
    phone: "",
    amount: ""
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (user) => {
    setEditId(user.id);
    setEditData({
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      amount: user.amount
    });
  };

  const handleSave = (id) => {
    editUser(id, {
      name: editData.name,
      surname: editData.surname,
      phone: editData.phone,
      amount: parseFloat(editData.amount)
    });
    setEditId(null);
  };

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.surname} ${user.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 3, p: 2 }}
      data-aos="zoom-in-up"
    >
      {/* Title + Search */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2
        }}
      >
        <Typography variant="h6">Qarzdorlar ro‘yxati</Typography>
        <TextField
          label="Qidirish"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: "300px" }}
        />
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ism</TableCell>
            <TableCell>Familiya</TableCell>
            <TableCell>Telefon</TableCell>
            <TableCell>Qarz summasi</TableCell>
            <TableCell>Sana</TableCell>
            {!isArchive && <TableCell>Amallar</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {editId === user.id ? (
                    <TextField
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell>
                  {editId === user.id ? (
                    <TextField
                      value={editData.surname}
                      onChange={(e) =>
                        setEditData({ ...editData, surname: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    user.surname
                  )}
                </TableCell>
                <TableCell>
                  {editId === user.id ? (
                    <TextField
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    user.phone
                  )}
                </TableCell>
                <TableCell>
                  {editId === user.id ? (
                    <TextField
                      type="number"
                      value={editData.amount}
                      onChange={(e) =>
                        setEditData({ ...editData, amount: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    `${user.amount ?? 0} so‘m`
                  )}
                </TableCell>
                <TableCell>{user.date}</TableCell>

                {!isArchive && (
                  <TableCell>
                    {editId === user.id ? (
                      <>
                        <IconButton
                          onClick={() => handleSave(user.id)}
                          color="success"
                        >
                          <Save />
                        </IconButton>
                        <IconButton
                          onClick={() => setEditId(null)}
                          color="error"
                        >
                          <Close />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          onClick={() => handleEdit(user)}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteUser(user.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={isArchive ? 5 : 6} align="center">
                Qarzdorlar yo‘q
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
