import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Chip,
  Divider,
 Dialog,
  IconButton,
  useTheme,
} from "@mui/material";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

import {
  containerSx,
  botonVolverSx,
  tituloSx,
  precioSx,
  varianteBtnSx,
  descripcionSx,
  botonAgregarSx,
  stockSx,
  variantesContainerSx,
} from "./ProductoDetalle.styles";

export default function ProductoDetalle() {
  const { state } = useLocation();
  const location = useLocation();
  const producto = state?.producto;

  const { agregarAlCarrito } = useCarrito();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState("");
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
  const [imagenActiva, setImagenActiva] = useState("");

  if (!producto) return <Typography>Producto no encontrado</Typography>;

  const tieneVariantes = producto.variantes?.length > 0;

  // 🔥 NORMALIZAR IMÁGENES
  const getImagen = (img) => {
    if (!img) return null;
    if (typeof img === "string") return img;
    if (typeof img === "object" && img.imagen) return img.imagen;
    return null;
  };

  const imagenes = useMemo(() => {
    if (varianteSeleccionada?.imagenes?.length > 0) {
      return varianteSeleccionada.imagenes
        .map(getImagen)
        .filter(Boolean);
    }

    return [
      producto.imagen,
      ...(producto.imagenes || []),
    ]
      .map(getImagen)
      .filter(Boolean);
  }, [producto, varianteSeleccionada]);

  useEffect(() => {
    if (imagenes.length > 0) {
      setImagenActiva(imagenes[0]);
    }
  }, [imagenes]);

  const precioActual =
    varianteSeleccionada?.precio ?? producto.precio;

  const stockTotal = producto.variantes?.length
    ? producto.variantes.reduce((acc, v) => acc + (v.stock || 0), 0)
    : producto.stock || 1;

  const handleAdd = async () => {
    if (!isAuthenticated) {
      toast.info("Inicia sesión para continuar");
      navigate("/login", { state: { from: location } });
      return;
    }

    if (tieneVariantes && !varianteSeleccionada) {
      toast.warning("Selecciona una variante");
      return;
    }

    try {
      await agregarAlCarrito(
        producto.id,
        varianteSeleccionada?.id || null,
        1
      );

      // 🔥 TU FORMATO ORIGINAL
      toast.success(`${producto.nombre} agregado al carrito 🛒`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <Box sx={containerSx}>
      {/* VOLVER */}
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={botonVolverSx(theme)}
        onClick={() => navigate(-1)}
      >
        Regresar
      </Button>

      <Grid container spacing={5} justifyContent="center">
        
        {/* 🔥 IMÁGENES PRO */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
            }}
          >
            {/* MINIATURAS */}
            {imagenes.length > 1 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  gap: 1,
                  overflowX: "auto",
                }}
              >
                {imagenes.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    onClick={() => setImagenActiva(img)}
                    sx={{
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                      borderRadius: 2,
                      cursor: "pointer",
                      border:
                        imagenActiva === img
                          ? "2px solid #1976d2"
                          : "1px solid #ccc",
                      opacity: imagenActiva === img ? 1 : 0.6,
                      transition: "0.3s",
                    }}
                  />
                ))}
              </Box>
            )}

            {/* IMAGEN PRINCIPAL */}
            <Box
              component="img"
              src={imagenActiva}
              onClick={() => {
                setZoomImage(imagenActiva);
                setZoomOpen(true);
              }}
              sx={{
                width: "100%",
                maxHeight: 450,
                objectFit: "contain",
                borderRadius: 2,
                cursor: "zoom-in",
                flex: 1,
              }}
            />
          </Box>
        </Grid>

        {/* DETALLE */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3} alignItems="center">
            
            <Typography variant="h4" sx={tituloSx}>
              {producto.nombre}
            </Typography>

            <Typography variant="h5" sx={precioSx(theme)}>
              ${precioActual}
            </Typography>

            {tieneVariantes && (
              <>
                <Typography fontWeight="bold">
                  Selecciona una opción:
                </Typography>

                <Stack direction="row" sx={variantesContainerSx}>
                  {producto.variantes.map((v) => {
                    const isSelected =
                      varianteSeleccionada?.id === v.id;

                    const label = [
                      v.talla,
                      v.color,
                      v.modelo,
                      v.capacidad,
                    ]
                      .filter(Boolean)
                      .join(" - ");

                    return (
                      <Button
                        key={v.id}
                        onClick={() => setVarianteSeleccionada(v)}
                        disabled={v.stock === 0}
                        sx={varianteBtnSx(isSelected, v.stock, theme)}
                      >
                        {label || "Única"}
                      </Button>
                    );
                  })}
                </Stack>

                {varianteSeleccionada && (
                  <Chip
                    label={`Stock: ${varianteSeleccionada.stock}`}
                    sx={stockSx(varianteSeleccionada.stock)}
                  />
                )}
              </>
            )}

            <Divider sx={{ width: "100%" }} />

            <Typography sx={descripcionSx}>
              {producto.descripcion}
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAdd}
              disabled={
                tieneVariantes
                  ? !varianteSeleccionada ||
                    varianteSeleccionada.stock === 0
                  : stockTotal === 0
              }
              sx={botonAgregarSx(
                tieneVariantes
                  ? varianteSeleccionada?.stock
                  : stockTotal
              )}
            >
              {tieneVariantes
                ? varianteSeleccionada
                  ? varianteSeleccionada.stock > 0
                    ? "Agregar al carrito"
                    : "Agotado"
                  : "Seleccionar opción"
                : stockTotal > 0
                ? "Agregar al carrito"
                : "Agotado"}
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* ZOOM */}
      <Dialog open={zoomOpen} onClose={() => setZoomOpen(false)}>
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setZoomOpen(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "black",
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            component="img"
            src={zoomImage}
            sx={{
              maxHeight: "80vh",
              maxWidth: "100%",
              display: "block",
              margin: "auto",
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
        }
