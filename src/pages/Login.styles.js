const loginStyles = {
  // 🌌 CONTENEDOR PRINCIPAL
  container: (theme) => ({
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 2,

    // 🔥 fondo dinámico según tema
    backgroundColor:
      theme.palette.mode === "dark" ? "#121212" : "#f5f5f5",
  }),

  // 📦 CARD (PAPER)
  paper: (theme) => ({
    p: 4,
    borderRadius: 3,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 3,

    // ✅ BORDE REAL (antes no se veía)
    border: "1px solid",
    borderColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.25)"
        : "rgba(0,0,0,0.15)",

    // 🌫 SOMBRA
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 12px 24px rgba(0,0,0,0.6)"
        : "0 12px 24px rgba(0,0,0,0.15)",

    // 🎨 FONDO
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(30,30,30,0.9)"
        : "rgba(255,255,255,0.95)",

    color: theme.palette.text.primary,

    backdropFilter: "blur(10px)", // 💎 glass effect
  }),

  // 🧠 TÍTULO
  titulo: (theme) => ({
    fontWeight: "bold",
    color:
      theme.palette.mode === "dark"
        ? "#90caf9"
        : "#1976d2",
  }),

  // ✏️ SUBTÍTULO
  subtitulo: (theme) => ({
    mb: 2,
    color: theme.palette.text.secondary,
  }),

  // 🔘 BOTÓN LOGIN
  botonLogin: (theme) => ({
    py: 1.4,
    fontWeight: 600,
    borderRadius: 2,

    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(135deg, #42a5f5, #1e88e5)"
        : "linear-gradient(135deg, #1976d2, #42a5f5)",

    color: "#fff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",

    transition: "all 0.25s ease",

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 22px rgba(0,0,0,0.35)",
    },
  }),

  // 🔲 BOTÓN REGISTER
  botonRegister: (theme) => ({
    py: 1.3,
    fontWeight: 500,
    borderRadius: 2,

    border: "1px solid",
    borderColor:
      theme.palette.mode === "dark"
        ? "#90caf9"
        : "#1976d2",

    color:
      theme.palette.mode === "dark"
        ? "#90caf9"
        : "#1976d2",

    backgroundColor: "transparent",

    transition: "all 0.25s ease",

    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(144,202,249,0.08)"
          : "rgba(25,118,210,0.08)",
      transform: "translateY(-2px)",
    },
  }),

  // 📚 CONTENEDOR DE ACCIONES
  acciones: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    mt: 1,
  },
};

export default loginStyles;
