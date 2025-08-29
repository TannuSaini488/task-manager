import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskDetail from "./pages/TaskDetail";
import AdminPanel from "./pages/AdminPanel";
import Stats from "./pages/Stats";
import "./styles.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />

            <Route path="/" element={
              <PrivateRoute><Dashboard/></PrivateRoute>
            } />
            <Route path="/tasks/:id" element={
              <PrivateRoute><TaskDetail/></PrivateRoute>
            } />
            <Route path="/stats" element={
              <PrivateRoute><Stats/></PrivateRoute>
            } />
            <Route path="/admin" element={
              <PrivateRoute role="admin"><AdminPanel/></PrivateRoute>
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
