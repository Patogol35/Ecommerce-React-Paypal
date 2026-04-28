import { useEffect, useMemo } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import {
  Typography,
  Box,
  Divider,
  Button,
  useTheme,
} from "@mui/material";

import { PayPalButtons } from "@paypal/react-paypal-js";

import CarritoItem from "../components/CarritoItem";
import { calcularSubtotal } from "../utils/carritoUtils";
import styles from "./Carrito.styles";

export default function Carrito() {
  const theme = useTheme();
  const {
    items,
    cargarCarrito,
    loading,
    limpiarLocal,
    setCantidad,
    eliminarItem,
  } = useCarrito();

  const { access } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    cargarCarrito();
    window.scrollTo(0, 0);
  }, []);

  // =========================
  // TOTAL
  // =========================
  const total = useMemo(
    () => items.reduce((acc, it) => acc + calcularSubtotal(it), 0),
    [items]
  );

  // =========================
  // INCREMENTAR
  // =========================
  const incrementar = (it) => {
    const stock = it.variante ? it.variante.stock : 999;

    if (it.cantidad < stock) {
      setCantidad(it.id, it.cantidad + 1);
    } else {
      toast.warning(`Solo hay ${stock} unidades disponibles`);
    }
  };

  // =========================
  // DECREMENTAR
  // =========================
  const decrementar = (it) => {
    if (it.cantidad > 1) {
      setCantidad(it.id, it.cantidad - 1);
    }
  };

  return (
    <Box sx={styles.root}>
      {/* HEADER */}
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        align="center"
        sx={styles.header}
      >
        <ShoppingCartIcon color="primary" sx={styles.headerIcon} />
        Mi Carrito
      </Typography>

      {/* LOADING */}
      {loading && <Typography>Cargando carrito...</Typography>}

      {/* VACÍO */}
      {!loading && items.length === 0 && (
        <Box sx={styles.emptyState}>
          <RemoveShoppingCartIcon
            color="disabled"
            sx={styles.emptyIcon}
          />

          <Typography variant="h6" sx={styles.emptyTitle(theme)}>
            Tu carrito está vacío
          </Typography>

          <Typography variant="body2" sx={styles.emptySubtitle(theme)}>
            Agrega productos para comenzar tu compra
          </Typography>

          <Button
            variant="contained"
            sx={styles.emptyButton}
            onClick={() => navigate("/")}
          >
            Ir a comprar
          </Button>
        </Box>
      )}

      {/* ITEMS */}
      {!loading &&
        items.map((it) => (
          <CarritoItem
            key={it.id}
            it={it}
            incrementar={incrementar}
            decrementar={decrementar}
            setCantidad={setCantidad}
            eliminarItem={eliminarItem}
          />
        ))}

      {/* FOOTER */}
      {!loading && items.length > 0 && (
        <Box sx={styles.footerBox(theme)}>
          <Typography variant="h6" sx={styles.total(theme)}>
            <MonetizationOnIcon fontSize="small" />
            Total: {total.toFixed(2)}
          </Typography>

          {/* 🔥 PAYPAL BUTTON */}
          <Box sx={{ mt: 2 }}>
            <PayPalButtons
  createOrder={async () => {
    try {
      const res = await fetch(
        "https://paypal-karg.onrender.com/api/paypal/crear-orden/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error creando orden");
      }

      return data.id;
    } catch (err) {
      toast.error(err.message);
    }
  }}

  onApprove={async (data) => {
    try {
      const res = await fetch(
        "https://paypal-karg.onrender.com/api/paypal/capturar/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify({
            orderID: data.orderID,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Error al capturar pago");
      }

      toast.success("Pago realizado con éxito 💰");

      limpiarLocal();
      navigate("/pedidos");
    } catch (err) {
      toast.error(err.message);
    }
  }}

  onError={(err) => {
    console.error(err);
    toast.error("Error con PayPal");
  }}
/>
          </Box>
        </Box>
      )}
    </Box>
  );
}
