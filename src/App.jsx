import React, { useState, useEffect } from "react";
import { Container, Typography, Paper } from "@mui/material";
import UserForm from "./components/UserForm";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import TotalDebt from "./components/TotalDebt";

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  // LocalStorage'dan olish
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // LocalStorage'ga yozish
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const startEditUser = (user) => {
    setEditingUser(user);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditingUser(null);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm) ||
      u.debt.toString().includes(searchTerm)
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🧾 Qarzlar Ro'yxati
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <UserForm
          addUser={addUser}
          editingUser={editingUser}
          updateUser={updateUser}
        />
      </Paper>

      <Paper sx={{ p: 2, mb: 3 }}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Paper>

      <UserList
        users={filteredUsers}
        deleteUser={deleteUser}
        startEditUser={startEditUser}
      />

      <TotalDebt users={filteredUsers} />
    </Container>
  );
}
