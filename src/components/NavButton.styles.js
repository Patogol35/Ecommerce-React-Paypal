const navButtonStyles = (theme, isActive, item, alwaysColoredPaths) => ({
  fontSize: "1.05rem",
  fontWeight: 600,
  color: "#fff",
  borderRadius: "12px",
  textTransform: "none",
  width: "100%",
  py: 1.2,
  transition: "all 0.25s ease",

  // 🔥 ICONO DINÁMICO (arreglo sin romper diseño)
  "& .MuiButton-startIcon": {
    color:
      isActive || alwaysColoredPaths.includes(item.path)
        ? "#fff"
        : theme.palette.text.primary,
  },

  // Fondo dinámico
  background: {
    xs: item.color,
    md:
      isActive || alwaysColoredPaths.includes(item.path)
        ? item.color
        : "transparent",
  },

  // Estado activo
  boxShadow: isActive ? "0 0 20px rgba(255,255,255,0.5)" : "none",
  transform: isActive ? "scale(1.04)" : "scale(1)",

  // HOVER
  "&:hover": {
    background: {
      xs: item.color,
      md: item.color,
    },
    boxShadow: isActive
      ? "0 0 20px rgba(0,0,0,0.4)"
      : "0 0 12px rgba(0,0,0,0.25)",
    filter: "brightness(1.1)",
  },

  // Dark mode
  ...(theme.palette.mode === "dark" && {
    color: "#fff",
    "&:hover": {
      filter: "brightness(1.2)",
    },
  }),
});

export default navButtonStyles;
