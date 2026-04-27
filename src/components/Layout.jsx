import { Box, Container, IconButton, Badge } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Tooltip from "@mui/material/Tooltip";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCarrito } from "../context/CarritoContext";
import { layoutStyles } from "./Layout.styles"; 

export default function Layout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const styles = layoutStyles(theme); 

  const { items } = useCarrito();

  const totalItems =
    items?.reduce(
      (acc, item) => acc + (item.cantidad || item.quantity || 0),
      0
    ) || 0;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        transition: "background-color 0.3s ease",
      }}
    >
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENIDO */}
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          pt: `calc(${theme.mixins.toolbar.minHeight}px + 24px)`,
          pb: 4,
        }}
      >
        <Outlet />
      </Container>

      {/* 🛒 BOTÓN FLOTANTE */}
      <IconButton
        onClick={() => navigate("/carrito")}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1300,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          color: theme.palette.primary.contrastText,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 12px 30px rgba(0,0,0,0.6)"
              : "0 10px 25px rgba(0,0,0,0.25)",
          transition: "all 0.25s ease",
          "&:hover": {
            transform: "translateY(-3px) scale(1.05)",
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
          },
        }}
      >
        <Badge badgeContent={totalItems} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      {/* FOOTER (EXTERNALIZADO) */}
      <Box component="footer" sx={styles.footer}>
  {/* Texto principal */}
  <Box>
    Ecommerce desarrollado por Jorge Patricio Santamaría Cherrez
  </Box>

  {/* Copyright */}
  <Box>
    © 2026 — Todos los derechos reservados
  </Box>

  {/* Redes */}
  <Box sx={styles.socialIcons}>
    <Tooltip title="Facebook">
      <IconButton
        className="facebook"
        component="a"
        href="https://www.facebook.com/share/1C9RgHAPvL/"
        target="_blank"
        rel="noopener"
      >
        <FacebookIcon />
      </IconButton>
    </Tooltip>

    <Tooltip title="Instagram">
      <IconButton
        className="instagram"
        component="a"
        href="https://www.instagram.com/jorge_patricio_26"
        target="_blank"
        rel="noopener"
      >
        <InstagramIcon />
      </IconButton>
    </Tooltip>

    <Tooltip title="LinkedIn">
      <IconButton
        className="linkedin"
        component="a"
        href="https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2"
        target="_blank"
        rel="noopener"
      >
        <LinkedInIcon />
      </IconButton>
    </Tooltip>
  </Box>
</Box>
    </Box>
  );
}
