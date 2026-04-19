import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";
import { toast } from "react-toastify";
import {
  Card,
  Typography,
  Button,
  Chip,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import {
  cardSx,
  imagenBoxSx,
  imagenSx,
  chipNuevoSx,
  contenidoSx,
  tituloSx,
  precioStackSx,
  dividerSx,
  botonAgregarSx,
  botonDetallesSx,
} from "./ProductoCard.styles";

export default function ProductoCard({ producto, onVerDetalle, onAgregar }) {
  const { isAuthenticated } = useAuth();
  const { agregarAlCarrito } = useCarrito();
  const navigate = useNavigate();

  // =========================
  // 🔥 IMÁGENES LIMPIAS (SIN DUPLICADOS)
  // =========================
  const imagenes = useMemo(() => {
    const imgs = [
      producto.imagen,
      ...(producto.imagenes?.map((img) => img.imagen) || []),
    ].filter(Boolean);

    return [...new Set(imgs)];
  }, [producto]);

  // 🔥 imagen inicial correcta
  const [imagenActiva, setImagenActiva] = useState(imagenes[0] || "");

  // =========================
  // 🔥 STOCK REAL DESDE VARIANTES
  // =========================
  const stockTotal = useMemo(() => {
    if (!producto.variantes || producto.variantes.length === 0) return 1;
    return producto.variantes.reduce((acc, v) => acc + (v.stock || 0), 0);
  }, [producto]);

  const tieneVariantes =
    producto.variantes && producto.variantes.length > 0;

  const tieneStockVariantes = producto.variantes?.some(
    (v) => v.stock > 0
  );

  // =========================
  // 🛒 AGREGAR
  // =========================
  const onAdd = async () => {
    if (!isAuthenticated) {
      toast.warn("Debes iniciar sesión para agregar productos");
      navigate("/login");
      return;
    }

    // 🔥 si tiene variantes → obligar ir a detalle
    if (tieneVariantes) {
      toast.info("Selecciona talla y color en el detalle 👇");

      if (onVerDetalle) {
        onVerDetalle();
      } else {
        navigate(`/producto/${producto.id}`, {
          state: { producto },
        });
      }
      return;
    }

    if (onAgregar) {
      onAgregar(producto);
      return;
    }

    try {
      await agregarAlCarrito(producto.id, 1, null);
      toast.success(`${producto.nombre} agregado al carrito ✅`);
    } catch (e) {
      toast.error(e.message || "Error al agregar");
    }
  };

  return (
    <Card sx={cardSx} elevation={0}>
      {/* Imagen */}
      <Box sx={imagenBoxSx}>
        <Box
          component="img"
          src={imagenActiva || "/placeholder.png"} // 🔥 fallback
          alt={producto.nombre}
          sx={imagenSx}
        />

        {producto.nuevo && (
          <Chip
            icon={<StarIcon />}
            label="Nuevo"
            color="secondary"
            size="small"
            sx={chipNuevoSx}
          />
        )}
      </Box>

      {/* Miniaturas */}
      {imagenes.length > 1 && (
        <Stack
          direction="row"
          spacing={1}
          sx={{ px: 1, mt: 1, justifyContent: "center" }}
        >
          {imagenes.map((img, i) => (
            <Box
              key={i}
              component="img"
              src={img}
              alt={`img-${i}`}
              onClick={() => setImagenActiva(img)}
              sx={{
                width: 45,
                height: 45,
                objectFit: "cover",
                borderRadius: 1,
                cursor: "pointer",
                border:
                  imagenActiva === img
                    ? "2px solid #1976d2"
                    : "1px solid #999",
              }}
            />
          ))}
        </Stack>
      )}

      {/* Contenido */}
      <Box sx={contenidoSx}>
        <Typography variant="h6" fontWeight="bold" sx={tituloSx}>
          {producto.nombre}
        </Typography>

        {/* 🔥 Indicador de variantes */}
        {tieneVariantes && (
          <Chip
            label="Seleccionar talla/color"
            color="info"
            size="small"
            sx={{ mb: 1 }}
          />
        )}

        {/* Precio */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={precioStackSx}
        >
          <MonetizationOnIcon color="primary" />
          <Typography variant="h6" color="primary" fontWeight="bold">
            ${producto.precio}
          </Typography>
        </Stack>

        <Divider sx={dividerSx} />

        {/* Botones */}
        <Stack spacing={1}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<AddShoppingCartIcon />}
            sx={botonAgregarSx(stockTotal)}
            onClick={onAdd}
            disabled={
              tieneVariantes
                ? !tieneStockVariantes
                : stockTotal === 0
            }
          >
            {tieneVariantes
              ? tieneStockVariantes
                ? "Seleccionar opciones"
                : "Agotado"
              : stockTotal > 0
              ? "Agregar al carrito"
              : "Agotado"}
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            fullWidth
            startIcon={<InfoIcon />}
            sx={botonDetallesSx}
            onClick={() =>
              onVerDetalle
                ? onVerDetalle()
                : navigate(`/producto/${producto.id}`, {
                    state: { producto },
                  })
            }
          >
            Ver detalles
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}
