import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Carrito from "./pages/Carrito";
import Pedidos from "./pages/Pedidos";
import ProductoDetalle from "./pages/ProductoDetalle";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";


function AppContent() {
  const { isReady } = useAuth();

  // 🚫 bloquea render hasta que auth esté listo
  if (!isReady) return null;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <Carrito />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pedidos"
          element={
            <ProtectedRoute>
              <Pedidos />
            </ProtectedRoute>
          }
        />

        <Route path="/producto/:id" element={<ProductoDetalle />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId="6793546722-pv1lpfoii9r4iibphcjfhe0vaef206t9.apps.googleusercontent.com">
      
      {/* 🔥 PAYPAL GLOBAL */}
      <PayPalScriptProvider
  options={{
    "client-id": "ATcBjmHPl7_b2zzC1FKSForT_83vQc5zbX6P7k3EAJHAHcGC-lXVNmz7kqM7N9hIgnA_xbP7NVxh_tVl",
    currency: "USD",
  }}
>
        
        <BrowserRouter>
          <AuthProvider>
            <CarritoProvider>
              <AppContent />
            </CarritoProvider>
          </AuthProvider>
        </BrowserRouter>
      </PayPalScriptProvider>

    </GoogleOAuthProvider>
  );
}

export default App;
