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
  const [editAmount, setEditAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleEdit = (user) => {
    setEditId(user.id);
    setEditAmount(user.amount);
  };

  const handleSave = (id) => {
    editUser(id, { amount: parseFloat(editAmount) });
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
        <Typography variant="h6">
          {isArchive ? "Arxivdagi qarzdorlar" : "Qarzdorlar ro‘yxati"}
        </Typography>
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
                <Typography><b>Ism:</b> {user.name}</Typography>
                <Typography><b>Familiya:</b> {user.surname}</Typography>
                <Typography><b>Telefon:</b> {user.phone}</Typography>
                <Typography><b>Sana:</b> {user.date}</Typography>

                {editId === user.id ? (
                  <>
                    <TextField
                      fullWidth
                      type="number"
                      label="Qarz summasi"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
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
                    <Typography>
                      <b>Qarz summasi:</b>{" "}
                      {user.amount != null ? `${user.amount} so‘m` : "-"}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}>
                      {isArchive ? (
                        <IconButton onClick={() => deleteUser(user.id)} color="error">
                          <Delete />
                        </IconButton>
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
                    </Box>
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
                <TableCell>Amallar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.surname}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    {editId === user.id ? (
                      <TextField
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                      />
                    ) : (
                      user.amount != null ? `${user.amount} so‘m` : "-"
                    )}
                  </TableCell>
                  <TableCell>{user.date}</TableCell>

                  <TableCell>
                    {isArchive ? (
                      <IconButton onClick={() => deleteUser(user.id)} color="error">
                        <Delete />
                      </IconButton>
                    ) : editId === user.id ? (
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
