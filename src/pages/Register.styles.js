const registerStyles = {
  container: (theme) => ({
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 2,

    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)"
        : "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
  }),

  paper: (theme) => ({
    p: 4,
    borderRadius: 3,
    width: "100%",
    maxWidth: 420,

    display: "flex",
    flexDirection: "column",
    gap: 3,

    // 🔥 estilo tipo card (como tus productos)
    background:
      theme.palette.mode === "dark"
        ? "#1f1f1f"
        : "#ffffff",

    border: "1px solid",
    borderColor:
      theme.palette.mode === "dark"
        ? "#2c2c2c"
        : "#e0e0e0",

    boxShadow:
      theme.palette.mode === "dark"
        ? "0 10px 30px rgba(0,0,0,0.6)"
        : "0 10px 25px rgba(0,0,0,0.12)",

    backdropFilter: "blur(6px)",
  }),

  titulo: (theme) => ({
    color: theme.palette.mode === "dark" ? "#4dabf5" : "#1976d2",
    letterSpacing: 0.5,
  }),

  subtitulo: {
    mb: 1,
    fontSize: "0.95rem",
  },

  // 🔥 INPUTS MÁS MODERNOS
  input: (theme) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      transition: "all 0.2s ease",

      "& fieldset": {
        borderColor:
          theme.palette.mode === "dark"
            ? "#3a3a3a"
            : "#d0d0d0",
      },

      "&:hover fieldset": {
        borderColor: "#42a5f5",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#1976d2",
        borderWidth: 2,
      },
    },
  }),

  strengthBox: {
    mt: 0.5,
    mb: 1,
  },

  strengthBar: (theme, color) => ({
    height: 7,
    borderRadius: 4,
    mb: 0.4,
    backgroundColor: theme.palette.mode === "dark" ? "#333" : "#ddd",
    "& .MuiLinearProgress-bar": { backgroundColor: color },
  }),

  strengthLabel: (color) => ({
    color,
    fontWeight: 600,
    fontSize: "0.75rem",
  }),

  checkbox: {
    mt: 0.5,
  },

  // 🔥 BOTÓN PRINCIPAL (más pro)
  boton: () => ({
    py: 1.4,
    fontWeight: 600,
    borderRadius: 2,
    fontSize: "0.95rem",

    background: "linear-gradient(135deg, #1976d2, #42a5f5)",

    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
      background: "linear-gradient(135deg, #1565c0, #1e88e5)",
    },

    transition: "all 0.25s ease",
  }),

  // 🔥 BOTÓN SECUNDARIO (igual estilo que card)
  botonRegister: (theme) => ({
    py: 1.2,
    borderRadius: 2,
    textTransform: "none",
    fontWeight: 500,

    border: "1px solid",
    borderColor:
      theme.palette.mode === "dark"
        ? "#ffffff"
        : "#000000",

    color:
      theme.palette.mode === "dark"
        ? "#ffffff"
        : "#000000",

    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.05)",
      transform: "scale(1.03)",
    },

    transition: "all 0.25s ease",
  }),
};

export default registerStyles;
