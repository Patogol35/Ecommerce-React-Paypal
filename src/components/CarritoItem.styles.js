import { alpha } from "@mui/material/styles";

const carritoItemStyles = {
  card: (theme) => ({
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },

    // 🔥 clave: evita que todo se estire en horizontal
    alignItems: "stretch",

    mb: 3,
    mx: { xs: 2, sm: 0 },
    borderRadius: 4,

    border: "1px solid",
borderColor:
  theme.palette.mode === "dark"
    ? alpha("#fff", 0.45)
    : alpha("#000", 0.45),

    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,

    boxShadow:
      theme.palette.mode === "dark"
        ? "0 4px 14px rgba(0,0,0,0.6)"
        : "0 4px 12px rgba(0,0,0,0.12)",

    transition: "all 0.25s ease",

    "&:hover": {
      transform: "translateY(-2px)",
    },
  }),

  // 🖼 CONTENEDOR IMAGEN
  mediaWrapper: (theme) => ({
  width: { xs: "100%", sm: 140 },

  height: "auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  backgroundColor: theme.palette.action.hover,

  borderRadius: { xs: "16px 16px 0 0", sm: "16px 0 0 16px" },

  p: 1.5,
}),
  // Imagen
  media: {
  width: "100%",

  // tamaño visual
  maxHeight: { xs: 180, sm: 120 },

  objectFit: "contain",

  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
},

  //  CONTENIDO
  content: (theme) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  p: { xs: 2.5, sm: 1.5 },
  gap: { xs: 1, sm: 0.5 },

  //  borde superior (móvil)
  borderTop: {
    xs: `1px solid ${
      theme.palette.mode === "dark"
        ? alpha("#fff", 0.25)
        : alpha("#000", 0.25)
    }`,
    sm: "none",
  },

  // 🔥 borde lateral (horizontal)
  borderLeft: {
    sm: `1px solid ${
      theme.palette.mode === "dark"
        ? alpha("#fff", 0.25)
        : alpha("#000", 0.25)
    }`,
  },
}),

  // 🎛 CONTROLES
  controlesWrapper: (theme) => ({
    display: "flex",
    flexDirection: { xs: "row", sm: "column" },

    justifyContent: "center",
    alignItems: "center",

    p: { xs: 2, sm: 1 },
    gap: { xs: 1.5, sm: 1 },

    borderLeft: {
      sm: `1px solid ${
        theme.palette.mode === "dark"
            ? alpha("#fff", 0.45)
      : alpha("#000", 0.45)
      }`,
    },

    borderTop: {
      xs: `1px solid ${
        theme.palette.mode === "dark"
            ? alpha("#fff", 0.45)
      : alpha("#000", 0.45)
      }`,
      sm: "none",
    },
  }),

  titulo: {
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: 1.3,
    mb: 0.3,
  },

  descripcion: {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "text.secondary",
    fontSize: "0.82rem",
    mb: 0.8,
  },

  chipSubtotal: {
    fontWeight: "bold",
    fontSize: "0.9rem",
  },

  chipStock: {
    fontWeight: "bold",
    fontSize: "0.8rem",
    opacity: 0.8,
  },

  cantidadWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    bgcolor: "action.hover",
    borderRadius: 2,
    px: 1,
    py: 0.4,
  },

  botonCantidad: {
    minWidth: 30,
    minHeight: 30,
    borderRadius: "50%",
    bgcolor: "background.paper",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    "&:hover": {
      transform: "scale(1.1)",
    },
    transition: "all 0.2s ease",
  },

  cantidadInput: {
    width: 45,
    "& input": {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "0.95rem",
    },
  },

  botonEliminar: (theme) => ({
    color: "error.main",
    borderRadius: 2,
    px: 1.5,
    "&:hover": {
      bgcolor: alpha(theme.palette.error.main, 0.1),
    },
  }),
};

export default carritoItemStyles;
