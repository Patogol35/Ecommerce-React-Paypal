import { useState, useEffect, useRef } from "react";
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

import Slider from "react-slick";

import {
  containerSx,
  botonVolverSx,
  imagenContainerSx,
  imagenSlideSx,
  imagenSx,
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
  const productoInicial = state?.producto;

  const navigate = useNavigate();
  const theme = useTheme();
  const sliderRef = useRef(null);

  const { agregarAlCarrito } = useCarrito();
  const { isAuthenticated } = useAuth();

  const [producto, setProducto] = useState(null);
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
  const [imagenes, setImagenes] = useState([]);

  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState("");

  // 🔥 TRAER PRODUCTO REAL DESDE API
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/productos/${productoInicial.id}/`
        );
        const data = await res.json();
        setProducto(data);
      } catch (error) {
        console.error("Error cargando producto", error);
      }
    };

    if (productoInicial?.id) {
      fetchProducto();
    }
  }, [productoInicial]);

  // 🔥 MANEJO DE IMÁGENES
  useEffect(() => {
    if (!producto) return;

    let imgs = [];

    if (varianteSeleccionada?.imagenes?.length > 0) {
      imgs = varianteSeleccionada.imagenes.map((img) => img.imagen);
    } else {
      imgs = [
        producto.imagen,
        ...(producto.imagenes?.map((i) => i.imagen) || []),
      ];
    }

    imgs = [...new Set(imgs.filter(Boolean))];

    setImagenes(imgs);

    setTimeout(() => {
      sliderRef.current?.slickGoTo(0);
    }, 0);

  }, [varianteSeleccionada, producto]);

  if (!producto) return <Typography>Cargando...</Typography>;

  const tieneVariantes = producto.variantes?.length > 0;

  const precioActual =
    varianteSeleccionada?.precio ?? producto.precio;

  const stockTotal = producto.variantes?.reduce(
    (acc, v) => acc + (v.stock || 0),
    0
  ) || 0;

  const handleAdd = async () => {
    if (!isAuthenticated) {
      toast.info("Inicia sesión");
      navigate("/login");
      return;
    }

    if (tieneVariantes && !varianteSeleccionada) {
      toast.warning("Selecciona variante");
      return;
    }

    try {
      await agregarAlCarrito(
        producto.id,
        varianteSeleccionada?.id || null,
        1
      );
      toast.success("Agregado ✅");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleZoom = (img) => {
    setZoomImage(img);
    setZoomOpen(true);
  };

  const settings = {
    dots: true,
    infinite: imagenes.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
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

      <Grid container spacing={5} justifyContent="center">
        {/* IMÁGENES */}
        <Grid item xs={12} md={6}>
          <Box sx={imagenContainerSx(theme)}>
            {imagenes.length > 0 && (
              <Slider ref={sliderRef} {...settings}>
                {imagenes.map((img, i) => (
                  <Box key={i} onClick={() => handleZoom(img)}>
                    <Box component="img" src={img} sx={imagenSx} />
                  </Box>
                ))}
              </Slider>
            )}
          </Box>
        </Grid>

        {/* DETALLE */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h4">{producto.nombre}</Typography>

            <Typography variant="h5">
              ${precioActual}
            </Typography>

            {tieneVariantes && (
              <>
                <Stack direction="row">
                  {producto.variantes.map((v) => (
                    <Button
                      key={v.id}
                      onClick={() => setVarianteSeleccionada(v)}
                    >
                      {v.talla} {v.color}
                    </Button>
                  ))}
                </Stack>
              </>
            )}

            <Typography>{producto.descripcion}</Typography>

            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAdd}
            >
              Agregar al carrito
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* ZOOM */}
      <Dialog open={zoomOpen} onClose={() => setZoomOpen(false)}>
        <Box>
          <IconButton onClick={() => setZoomOpen(false)}>
            <CloseIcon />
          </IconButton>

          <Box component="img" src={zoomImage} />
        </Box>
      </Dialog>
    </Box>
  );
}
