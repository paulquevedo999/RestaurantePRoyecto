import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

//import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import Principal from "./pages/Principal";
import NewOrden from "./pages/orden/newOrden";
import Ingreso from "./pages/orden/ingreso";
import Bodega from "./pages/Bodega/Bodegas"
import Reportes from './pages/orden/Reportes'
import Facturas from './pages/orden/Facturas'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
        

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Principal />
              </ProtectedRoute>
            }
          />
            <Route
            path="/ingreso"
            element={
              <ProtectedRoute>
                <Ingreso />
              </ProtectedRoute>
            }
          />
          <Route
            path="/facturasxautorizar"
            element={
              <ProtectedRoute>
                <Facturas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reportes"
            element={
              <ProtectedRoute>
                <Reportes />
              </ProtectedRoute>
            }
          />

           <Route
            path="/bodega"
            element={
              <ProtectedRoute>
                <Bodega />
              </ProtectedRoute>
            }
          />


            <Route
            path="/newOrden"
            element={
              <ProtectedRoute>
                <NewOrden />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);