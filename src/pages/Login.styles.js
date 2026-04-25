const loginStyles = {
  container: (theme) => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  background:
    theme.palette.mode === "dark"
      ? "#121212"
      : "#f5f7fa",
}),

  paper: (theme) => ({
    p: 4,
    borderRadius: 3,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 3,

    // ✅ usar sistema MUI
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,

    // ✅ borde correcto
    border: "1px solid",
    borderColor: theme.palette.divider,

    // ✅ sombra adaptada
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 12px 24px rgba(0,0,0,0.6)"
        : "0 12px 24px rgba(0,0,0,0.12)",

    backdropFilter: "blur(6px)",
  }),

  titulo: (theme) => ({
    color: theme.palette.primary.main,
  }),

  subtitulo: (theme) => ({
    mb: 2,
    color: theme.palette.text.secondary,
  }),

  // 🔥 BOTÓN LOGIN PRO
  botonLogin: (theme) => ({
    py: 1.4,
    fontWeight: 600,
    borderRadius: 2,

    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,

    color: theme.palette.primary.contrastText,

    boxShadow:
      theme.palette.mode === "dark"
        ? "0 6px 18px rgba(0,0,0,0.5)"
        : "0 6px 18px rgba(0,0,0,0.2)",

    transition: "all 0.25s ease",

    "&:hover": {
      transform: "translateY(-2px)",
      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    },
  }),

  // 🔥 BOTÓN REGISTER PRO
  botonRegister: (theme) => ({
    py: 1.3,
    fontWeight: 500,
    borderRadius: 2,

    border: "1px solid",
    borderColor: theme.palette.primary.main,

    color: theme.palette.primary.main,

    backgroundColor: "transparent",

    transition: "all 0.25s ease",

    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      transform: "translateY(-2px)",
    },
  }),

  acciones: {
    display: "flex",
    flexDirection: "column",
    gap: 1.2,
    mt: 1,
  },
};

export default loginStyles;
