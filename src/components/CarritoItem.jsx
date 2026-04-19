import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Chip,
  TextField,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { toast } from "react-toastify";
import { calcularSubtotal } from "../utils/carritoUtils";
import carritoItemStyles from "./CarritoItem.styles";

export default function CarritoItem({
  it,
  theme,
  incrementar,
  decrementar,
  setCantidad,
  eliminarItem,
}) {
  // 🔥 STOCK REAL (VARIANTE > PRODUCTO)
  const stock = it.variante?.stock ?? 0;

  // =========================
  // 🖼 IMAGEN DINÁMICA
  // =========================
  const imagen =
    it.variante?.imagenes?.[0]?.imagen || // 🔥 variante primero
    it.producto?.imagenes?.[0]?.imagen || // luego imágenes producto
    it.producto?.imagen || // fallback principal
    "/placeholder.png"; // último fallback

  const altTexto = it.variante
    ? `${it.producto?.nombre} ${it.variante.color || ""}`
    : it.producto?.nombre;

  return (
    <Card sx={carritoItemStyles.card}>
      {/* Imagen */}
      <CardMedia
        component="img"
        image={imagen}
        alt={altTexto}
        sx={(theme) => carritoItemStyles.media(theme)}
      />

      {/* INFO */}
      <CardContent sx={carritoItemStyles.content}>
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {it.producto?.nombre}
          </Typography>

          {/* 🔥 VARIANTE */}
          {it.variante && (
            <Typography variant="body2" color="text.secondary">
              {it.variante.talla && `Talla: ${it.variante.talla}`}{" "}
              {it.variante.color && `Color: ${it.variante.color}`}
            </Typography>
          )}

          <Typography
            variant="body2"
            color="text.secondary"
            sx={carritoItemStyles.descripcion}
          >
            {it.producto?.descripcion}
          </Typography>
        </Box>

        {/* PRECIO + STOCK */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            icon={<MonetizationOnIcon />}
            label={`$${calcularSubtotal(it).toFixed(2)}`}
            color="success"
            sx={carritoItemStyles.chipSubtotal}
          />

          <Chip
            label={`Stock: ${stock}`}
            color={stock > 0 ? "info" : "default"}
            sx={carritoItemStyles.chipStock}
          />
        </Box>
      </CardContent>

      {/* CONTROLES */}
      <Box sx={carritoItemStyles.controlesWrapper}>
        <Box sx={carritoItemStyles.cantidadWrapper}>
          {/* RESTAR */}
          <IconButton
            onClick={() => decrementar(it)}
            disabled={it.cantidad <= 1}
            sx={carritoItemStyles.botonCantidad}
          >
            <RemoveIcon />
          </IconButton>

          {/* INPUT */}
          <TextField
            type="number"
            size="small"
            value={it.cantidad}
            inputProps={{ min: 1, max: stock }}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "") {
                setCantidad(it.id, 1);
                return;
              }

              const nuevaCantidad = Number(value);

              if (nuevaCantidad >= 1 && nuevaCantidad <= stock) {
                setCantidad(it.id, nuevaCantidad);
              } else if (nuevaCantidad > stock) {
                toast.warning(`Solo hay ${stock} unidades`);
                setCantidad(it.id, stock);
              } else {
                setCantidad(it.id, 1);
              }
            }}
            sx={carritoItemStyles.cantidadInput}
          />

          {/* SUMAR */}
          <IconButton
            onClick={() => incrementar(it)}
            disabled={it.cantidad >= stock}
            sx={carritoItemStyles.botonCantidad}
          >
            <AddIcon />
          </IconButton>
        </Box>

        {/* ELIMINAR */}
        <IconButton
          onClick={() => eliminarItem(it.id)}
          sx={carritoItemStyles.botonEliminar}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
