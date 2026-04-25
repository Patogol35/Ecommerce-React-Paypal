// ================================
// CONTENEDOR PRINCIPAL
// ================================
export const containerSx = {
  maxWidth: 1100,
  mx: "auto",
  p: { xs: 2, md: 5 },

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: 4,
};

export const dividerSx = (theme) => {
  const borderColor =
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.35)"
      : "rgba(0,0,0,0.25)";

  return {
    width: "100%",
    my: 2,
    height: "1px",
    border: "none",

    backgroundColor: borderColor,
  };
};

// ================================
// BOTÓN VOLVER
// ================================
export const botonVolverSx = (theme) => ({
  alignSelf: "center",
  borderRadius: "999px",
  textTransform: "none",
  fontWeight: 500,
  px: 2,
  py: 0.6,

  border: "1px solid",
  borderColor:
  theme.palette.mode === "dark"
    ? "rgba(255,255,255,0.5)" // más blanco visible
    : "rgba(0,0,0,0.4)",      // más negro visible

  color: theme.palette.text.primary,
  backdropFilter: "blur(6px)",

  transition: "all 0.25s ease",

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "scale(1.05)",
  },
});

// ================================
// WRAPPER IMÁGENES
// ================================
export const imagenWrapperSx = {
  display: "flex",
  gap: 2,
  flexDirection: { xs: "column", md: "row" },
  alignItems: "center",
  justifyContent: "center",
};

// ================================
// MINIATURAS (CORREGIDO DARK/LIGHT)
// ================================
export const miniaturasContainerSx = {
  display: "flex",
  flexDirection: { xs: "row", md: "column" },
  gap: 1.5,
  overflowX: "auto",
  padding: "4px",

  "&::-webkit-scrollbar": {
    height: 6,
    width: 6,
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#ccc",
    borderRadius: 10,
  },
};

export const miniaturaSx = (activa, theme) => ({
  width: 70,
  height: 70,
  objectFit: "cover",
  borderRadius: 10,
  cursor: "pointer",
  flexShrink: 0,

  border: activa
    ? `2px solid ${theme.palette.primary.main}`
    : `1px solid ${theme.palette.divider}`,

  opacity: activa ? 1 : 0.7,

  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",

  transform: activa ? "scale(1.08)" : "scale(1)",

  transition: "all 0.25s ease",

  "&:hover": {
    opacity: 1,
    transform: "scale(1.1)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
  },
});

// ================================
// IMAGEN CONTENEDOR
// ================================
export const imagenContainerSx = (theme) => ({
  bgcolor: theme.palette.background.paper,
  borderRadius: 5,
  p: 2,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  maxHeight: 320,
  maxWidth: 240,

  border: "1px solid",
  borderColor:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.35)"
      : "rgba(0,0,0,0.3)",

  boxShadow:
    theme.palette.mode === "dark"
      ? "0 20px 50px rgba(0,0,0,0.7)"
      : "0 20px 50px rgba(0,0,0,0.08)",

  overflow: "hidden",
  transition: "all 0.25s ease",

  "&:hover": {
    transform: "scale(1.01)",
  },

  "&:hover img": {
    transform: "scale(1.08)",
  },
});
// ================================
// IMAGEN
// ================================
export const imagenSx = {
  maxWidth: "80%",
  maxHeight: 440,
  objectFit: "contain",
  borderRadius: 3,
  transition: "transform 0.5s ease",
};

// ================================
// ZOOM
// ================================
export const zoomContainerSx = (theme) => ({
  position: "relative",
  bgcolor: theme.palette.background.default,
});

export const zoomCloseBtnSx = {
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 2,
  bgcolor: "rgba(0,0,0,0.7)",
  color: "#fff",

  "&:hover": {
    bgcolor: "rgba(0,0,0,0.9)",
  },
};

export const zoomImagenSx = {
  maxHeight: "80vh",
  maxWidth: "100%",
  display: "block",
  margin: "0 auto",
  cursor: "zoom-out",
};

// ================================
// TÍTULO
// ================================
export const tituloSx = {
  fontWeight: 700,
  fontSize: { xs: "1.5rem", md: "2rem" },
};

// ================================
// PRECIO
// ================================
export const precioSx = (theme) => ({
  fontWeight: 800,
  fontSize: "2rem",
  color: theme.palette.primary.main,
});

// ================================
// STOCK
// ================================
export const stockSx = (stock) => ({
  alignSelf: "center",
  px: 1.8,
  py: 0.5,
  borderRadius: "999px",
  fontSize: "0.75rem",
  fontWeight: 600,
  backdropFilter: "blur(6px)",

  background:
    stock > 0
      ? "linear-gradient(135deg, #e8f5e9, #c8e6c9)"
      : "linear-gradient(135deg, #ffebee, #ffcdd2)",

  color: stock > 0 ? "#1b5e20" : "#b71c1c",

  border: "1px solid",
  borderColor: stock > 0 ? "#a5d6a7" : "#ef9a9a",
});

// ================================
// VARIANTES (CORREGIDO)
// ================================
export const variantesContainerSx = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: 1,
};

export const varianteBtnSx = (isSelected, stock, theme) => ({
  borderRadius: "999px",
  textTransform: "none",
  fontWeight: 500,
  px: 2,
  py: 0.7,

  border: "1px solid",
  borderColor:
  theme.palette.mode === "dark"
    ? "rgba(255,255,255,0.5)" 
    : "rgba(0,0,0,0.4)",      

  backgroundColor: isSelected
    ? theme.palette.primary.main
    : theme.palette.action.hover,

  color: isSelected
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  

  opacity: stock === 0 ? 0.4 : 1,

  transition: "all 0.25s ease",

  "&:hover": {
    transform: stock > 0 ? "scale(1.05)" : "none",
    backgroundColor: isSelected
      ? theme.palette.primary.dark
      : theme.palette.action.selected,
  },
});

// ================================
// DESCRIPCIÓN
// ================================
export const descripcionSx = {
  color: "text.secondary",
  lineHeight: 1.7,
  fontSize: "0.95rem",
};

// ================================
// BOTÓN AGREGAR
// ================================
export const botonAgregarSx = (stock) => ({
  alignSelf: "center",
  borderRadius: "999px",
  px: 3,
  py: 1.2,

  display: "flex",
  alignItems: "center",
  gap: 1,

  fontWeight: 700,

  background:
    stock > 0
      ? "linear-gradient(135deg, #1976d2, #42a5f5)"
      : "#9e9e9e",

  color: "#fff",

  boxShadow:
    stock > 0
      ? "0 10px 25px rgba(25,118,210,0.4)"
      : "none",

  transition: "all 0.25s ease",

  "&:hover": {
    transform: stock > 0 ? "scale(1.05)" : "none",
  },
});
