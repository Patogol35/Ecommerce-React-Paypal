import { useState, useMemo, useEffect, useCallback, useRef } from "react";
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
  imagenContainerSx,
  dividerSx,
  tituloSx,
  precioSx,
  varianteBtnSx,
  descripcionSx,
  botonAgregarSx,
  stockSx,
  variantesContainerSx,
  imagenWrapperSx,
  miniaturasContainerSx,
  miniaturaSx,
  zoomContainerSx,
  zoomCloseBtnSx,
  zoomImagenSx,
} from "./ProductoDetalle.styles";

export default function ProductoDetalle() {
  const location = useLocation();
  const producto = location.state?.producto;

  const { agregarAlCarrito } = useCarrito();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState("");
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
  const [imagenMostrada, setImagenMostrada] = useState("");
  const [fade, setFade] = useState(true);
  const [adding, setAdding] = useState(false);

  const timerRef = useRef();

  useEffect(() => {
    const handleMenuOpen = () => {
      setZoomOpen(false);
    };

    window.addEventListener("menuOpen", handleMenuOpen);
    return () => {
      window.removeEventListener("menuOpen", handleMenuOpen);
      clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!producto) return <Typography>Producto no encontrado</Typography>;

  const tieneVariantes = producto.variantes?.length > 0;

  const getImagen = useCallback((img) => {
    if (!img) return null;
    if (typeof img === "string") return img;
    if (typeof img === "object" && img.imagen) return img.imagen;
    return null;
  }, []);

  const variantes = useMemo(
    () => producto.variantes || [],
    [producto]
  );

  const imagenes = useMemo(() => {
    if (varianteSeleccionada?.imagenes?.length > 0) {
      return varianteSeleccionada.imagenes
        .map(getImagen)
        .filter(Boolean);
    }

    return [producto.imagen, ...(producto.imagenes || [])]
      .map(getImagen)
      .filter(Boolean);
  }, [producto, varianteSeleccionada, getImagen]);

  useEffect(() => {
    if (imagenes.length > 0) {
      setImagenMostrada(imagenes[0]);
    }
  }, [imagenes]);

  const mostrarMiniaturas = useMemo(() => {
    if (varianteSeleccionada) {
      return varianteSeleccionada.imagenes?.length > 1;
    }

    const totalImgs = [producto.imagen, ...(producto.imagenes || [])]
      .map(getImagen)
      .filter(Boolean).length;

    return totalImgs > 1;
  }, [producto, varianteSeleccionada, getImagen]);

  const cambiarImagen = (imgUrl) => {
    if (imgUrl === imagenMostrada) return;

    setFade(false);

    timerRef.current = setTimeout(() => {
      setImagenMostrada(imgUrl);
      setFade(true);
    }, 150);
  };

  const precioActual =
    varianteSeleccionada?.precio ?? producto.precio;

  const stockTotal = tieneVariantes
    ? variantes.reduce((acc, v) => acc + (v.stock || 0), 0)
    : producto.stock || 0;

  const handleAdd = async () => {
    if (adding) return;

    if (!isAuthenticated) {
      toast.info("Inicia sesión para continuar");
      navigate("/login", { state: { from: location } });
      return;
    }

    if (tieneVariantes && !varianteSeleccionada) {
      toast.warning("Selecciona una variante");
      return;
    }

    setAdding(true);

    try {
      await agregarAlCarrito(
        producto.id,
        varianteSeleccionada?.id || null,
        1
      );

      toast.success(`${producto.nombre} agregado al carrito 🛒`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Box sx={containerSx}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={botonVolverSx(theme)}
        onClick={() => navigate(-1)}
      >
        Regresar
      </Button>

      <Grid container spacing={5} justifyContent="center" alignItems="center">
        {/* IMÁGENES */}
        <Grid item xs={12} md={6}>
          <Box sx={imagenWrapperSx}>
            <Box
              sx={{ ...imagenContainerSx(theme), cursor: "zoom-in" }}
              onClick={() => {
                setZoomImage(imagenMostrada);
                setZoomOpen(true);
              }}
            >
              <Box
                component="img"
                src={imagenMostrada}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "12px",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  opacity: fade ? 1 : 0,
                  transform: fade ? "scale(1)" : "scale(0.97)",
                }}
              />
            </Box>

            {mostrarMiniaturas && (
              <Box sx={miniaturasContainerSx}>
                {imagenes.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    onClick={() => cambiarImagen(img)}
                    sx={(theme) =>
                      miniaturaSx(imagenMostrada === img, theme)
                    }
                  />
                ))}
              </Box>
            )}
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
                  {variantes.map((v) => {
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

            <Divider sx={dividerSx} />

            <Typography sx={descripcionSx}>
              {producto.descripcion}
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAdd}
              disabled={
                adding ||
                (tieneVariantes
                  ? !varianteSeleccionada ||
                    varianteSeleccionada.stock === 0
                  : stockTotal === 0)
              }
              sx={botonAgregarSx(
                tieneVariantes
                  ? varianteSeleccionada?.stock
                  : stockTotal
              )}
            >
              {adding
                ? "Agregando..."
                : tieneVariantes
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
        <Box sx={zoomContainerSx(theme)}>
          <IconButton onClick={() => setZoomOpen(false)} sx={zoomCloseBtnSx}>
            <CloseIcon />
          </IconButton>

          <Box component="img" src={zoomImage} sx={zoomImagenSx} />
        </Box>
      </Dialog>
    </Box>
  );
        }
