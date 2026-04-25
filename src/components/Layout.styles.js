import { alpha } from "@mui/material/styles";

export const layoutStyles = (theme) => ({
  footer: {
    mt: "auto",
    py: 3,
    px: 2,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1.4,

    textAlign: "center",

    // 🔵 fondo dinámico según modo
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(135deg, #0a192f, #0d47a1, #1565c0)" // 🌑 azul más profundo
        : "linear-gradient(135deg, #0A66C2, #1976d2, #42a5f5)", // ☀️ azul brillante

    borderTop: `1px solid ${alpha("#fff", 0.15)}`,

    color: "#fff",

    fontSize: "0.85rem",
    letterSpacing: "0.4px",
    lineHeight: 1.5,

    transition: "all 0.3s ease",
  },

  socialIcons: {
    display: "flex",
    gap: 1.2,
    mt: 0.5,

    "& .MuiIconButton-root": {
      backgroundColor: alpha("#fff", 0.12),
      color: "#fff",
      transition: "all 0.3s ease",

      "&:hover": {
        transform: "translateY(-3px) scale(1.12)",
        backgroundColor: alpha("#fff", 0.25),
      },
    },

    // ✨ glow más suave en dark
    "& .MuiIconButton-root:hover": {
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 0 18px rgba(255,255,255,0.25)"
          : "0 0 14px rgba(255,255,255,0.6)",
    },
  },
});
