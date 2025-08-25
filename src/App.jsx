import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/sidebar/Sidebar";
import UserForm from "./components/userForm/UserForm";
import UserList from "./components/userList/UserList";
import ProductForm from "./components/productForm/ProductForm";
import ProductList from "./components/productList/ProductList";
import SalesStats from "./components/salesStats/SalesStats";
import TotalDebt from "./components/totalDebt/TotalDebt";
import Login from "./pages/login/Login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [users, setUsers] = useState([]);
  const [archive, setArchive] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState("qarzdorlar");
  const [editingProduct, setEditingProduct] = useState(null);

  // localStorage'dan ma'lumotlarni olish
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const savedArchive = JSON.parse(localStorage.getItem("archive")) || [];
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    setUsers(savedUsers);
    setArchive(savedArchive);
    setProducts(savedProducts);
  }, []);

  // localStorage'ga yozish
  useEffect(() => { localStorage.setItem("users", JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem("archive", JSON.stringify(archive)); }, [archive]);
  useEffect(() => { localStorage.setItem("products", JSON.stringify(products)); }, [products]);

  // Qarzdor qo‘shish
  const addUser = (user) => {
    const newUser = { ...user, id: Date.now(), date: new Date().toISOString().split("T")[0] };
    setUsers([...users, newUser]);
  };

  // Qarzdorni tahrirlash
  const editUser = (id, updatedData) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, ...updatedData } : u)));
  };

  // Qarzdorni o‘chirish (arxivga tushirish)
  const deleteUser = (id) => {
    const deletedUser = users.find((u) => u.id === id);
    if (deletedUser) {
      setArchive([...archive, deletedUser]);
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // Arxivdan qaytarish
  const restoreUser = (id) => {
    const restoredUser = archive.find((u) => u.id === id);
    if (restoredUser) {
      setUsers([...users, restoredUser]);
      setArchive(archive.filter((u) => u.id !== id));
    }
  };

  // ❌ Arxivdan butunlay o‘chirish
  const deleteFromArchive = (id) => {
    setArchive(archive.filter((u) => u.id !== id));
  };

  // Mahsulot qo‘shish / tahrirlash
  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const startEditProduct = (product) => {
    setEditingProduct(product);
    setCurrentPage("mahsulot");
  };

  const saveProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    setEditingProduct(null);
    setCurrentPage("mahsulotlar");
  };

  // Mahsulot o‘chirish
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <>
      <ToastContainer />
      {isLoggedIn ? (
        <div style={{ display: "flex" }}>
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            {currentPage === "qarzdorlar" && (
              <>
                <Typography variant="h4" align="center" gutterBottom>Qarzlar Ro'yxati</Typography>
                <UserForm addUser={addUser} />
                <UserList
                  users={users}
                  editUser={editUser}
                  deleteUser={deleteUser}
                  isArchive={false}
                />
                <TotalDebt users={users} />
              </>
            )}

            {currentPage === "arxiv" && (
              <>
                <Typography variant="h4" align="center" gutterBottom>Arxiv</Typography>
                <UserList
                  users={archive}
                  isArchive={true}
                  restoreUser={restoreUser}
                  deleteUser={deleteFromArchive}
                />
                <TotalDebt users={archive} />
              </>
            )}

            {currentPage === "mahsulot" && (
              <>
                <Typography variant="h4" align="center" gutterBottom>
                  {editingProduct ? "Mahsulotni tahrirlash" : "Mahsulot qo‘shish"}
                </Typography>
                <ProductForm
                  addProduct={addProduct}
                  editingProduct={editingProduct}
                  saveProduct={saveProduct}
                />
              </>
            )}

            {currentPage === "mahsulotlar" && (
              <>
                <Typography variant="h4" align="center" gutterBottom>Mahsulotlar ro‘yxati</Typography>
                <ProductList
                  products={products}
                  editProduct={startEditProduct}
                  deleteProduct={deleteProduct}
                />
              </>
            )}

            {["kunlik", "oylik", "yillik"].includes(currentPage) && (
              <SalesStats users={users} type={currentPage} />
            )}
          </Container>
        </div>
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}
