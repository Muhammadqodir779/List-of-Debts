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
  TableContainer,
  Paper,
  Typography,
  Card,
  CardContent,
  useMediaQuery
} from "@mui/material";
import { Edit, Delete, Save, Close } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function UserList({ users, editUser, deleteUser, isArchive = false }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    surname: "",
    phone: "",
    amount: ""
  });
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // faqat sm va undan kichik

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
    <Box sx={{ mt: 3 }}>
      {/* Title + Search */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "stretch" : "center",
          mb: 2,
          gap: 2
        }}
      >
        <Typography variant="h6">Qarzdorlar ro‘yxati</Typography>
        <TextField
          label="Qidirish"
          variant="outlined"
          fullWidth={isMobile}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: isMobile ? "100%" : "300px" }}
        />
      </Box>

      {/* RESPONSIVE TABLE / CARD */}
      {isMobile ? (
        // 📱 Mobileda CARD format
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredUsers.map((user) => (
            <Card key={user.id} sx={{ p: 1 }}>
              <CardContent>
                {editId === user.id ? (
                  <>
                    <TextField
                      fullWidth
                      label="Ism"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="Familiya"
                      value={editData.surname}
                      onChange={(e) => setEditData({ ...editData, surname: e.target.value })}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="Telefon"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      type="number"
                      label="Qarz summasi"
                      value={editData.amount}
                      onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                      sx={{ mb: 1 }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <IconButton onClick={() => handleSave(user.id)} color="success">
                        <Save />
                      </IconButton>
                      <IconButton onClick={() => setEditId(null)} color="error">
                        <Close />
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography><b>Ism:</b> {user.name}</Typography>
                    <Typography><b>Familiya:</b> {user.surname}</Typography>
                    <Typography><b>Telefon:</b> {user.phone}</Typography>
                    <Typography>
                      <b>Qarz summasi:</b> {user.amount != null ? `${user.amount} so‘m` : "-"}
                    </Typography>
                    <Typography><b>Sana:</b> {user.date}</Typography>

                    {!isArchive && (
                      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}>
                        <IconButton onClick={() => handleEdit(user)} color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => deleteUser(user.id)} color="error">
                          <Delete />
                        </IconButton>
                      </Box>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        // 🖥️ Desktopda TABLE format
        <TableContainer component={Paper}>
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
                      user.amount != null ? `${user.amount} so‘m` : "-"
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
        </TableContainer>
      )}
    </Box>
  );
}
