import React, { useState, useEffect } from "react";
import { Container, Typography, Paper } from "@mui/material";
import UserForm from "./components/userForm/UserForm";
import SearchBar from "./components/searchBar/SearchBar";
import UserList from "./components/userList/UserList";
import TotalDebt from "./components/totalDebt/TotalDebt";

export default function App() {
  const [users, setUsers] = useState([]); // `users` — foydalanuvchilar ro‘yxatini saqlaydi. `setUsers` — `users`ni o‘zgartirish uchun ishlatiladi.
  const [searchTerm, setSearchTerm] = useState(""); // Qidiruv maydonida yozilgan matnni saqlaydi
  const [editingUser, setEditingUser] = useState(null); // Hozirda tahrirlanayotgan foydalanuvchini saqlash.  Agar `null` bo‘lsa — hech kim tahrirlanmayapti degani.

  // LocalStorage'dan olish
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []); // Sahifa birinchi marta yuklanganda localStoragedan oldingi ma’lumotlarni olish. 
  // [] — bu effect faqat bir marta ishlashini bildiradi.

  // LocalStorage'ga yozish
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]); // Har safar `users` o‘zgarganda uni **localStorage**ga yozib qo‘yish. `[users]` — faqat `users` o‘zgarsa ishlaydi.

  const addUser = (user) => {
    setUsers([...users, user]);
  }; // Yangi foydalanuvchini users ro‘yxatiga qo‘shadi. Misol: Daftarga yangi ism yozish.


  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  }; // Berilgan idga teng bo‘lgan foydalanuvchini ro‘yxatdan o‘chiradi. Misol: Daftardan bitta odamni o‘chirish.


  const startEditUser = (user) => {
    setEditingUser(user);
  }; // Tahrir boshlanadigan foydalanuvchini state’da saqlaydi. Misol: Daftardan bitta odamni olib, ustiga yozishga tayyorlab qo‘yish.


  const updateUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditingUser(null);
  }; // Foydalanuvchi ma’lumotlarini yangilaydi. 
  // Tahrir tugagach, editingUserni null qiladi.
  // Misol: Daftardagi eski yozuvni ustidan yangisini yozib qo‘yish.

  const filteredUsers = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm) ||
      u.debt.toString().includes(searchTerm)
  ); // Qidiruv so‘ziga mos kelgan foydalanuvchilarni ro‘yxatdan ajratib olish.

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
