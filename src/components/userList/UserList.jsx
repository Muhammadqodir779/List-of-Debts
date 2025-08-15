import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  Box
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
    <>
      {/* Qidirish inputi */}
      <Box sx={{ mb: 2, maxWidth: "850px" }}>
        <TextField
          label="Qidirish"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ height: "50px" }}
          inputProps={{
            style: { height: "50px", padding: "0 14px" }
          }}
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
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {editId === user.id ? (
                  <TextField
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
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
                  />
                ) : (
                  `${user.amount} so‘m`
                )}
              </TableCell>
              <TableCell>{user.date}</TableCell>

              {!isArchive && (
                <TableCell>
                  {editId === user.id ? (
                    <>
                      <IconButton onClick={() => handleSave(user.id)} color="success">
                        <Save />
                      </IconButton>
                      <IconButton onClick={() => setEditId(null)} color="error">
                        <Close />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(user)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => deleteUser(user.id)} color="error">
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
