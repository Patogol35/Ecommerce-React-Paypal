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

    // fondo dinámico
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(135deg, #121212, #1e1e1e)" // 🌑 negro elevado (no puro)
        : "linear-gradient(135deg, #0A66C2, #1976d2, #42a5f5)",

    borderTop: `1px solid ${
      theme.palette.mode === "dark"
        ? alpha("#fff", 0.08)
        : alpha("#fff", 0.15)
    }`,

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
      backgroundColor:
        theme.palette.mode === "dark"
          ? alpha("#fff", 0.06)
          : alpha("#fff", 0.12),

      color: "#fff",
      transition: "all 0.3s ease",

      "&:hover": {
        transform: "translateY(-3px) scale(1.12)",
        backgroundColor: alpha("#fff", 0.2),
      },
    },

    "& .MuiIconButton-root:hover": {
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 0 14px rgba(255,255,255,0.2)"
          : "0 0 14px rgba(255,255,255,0.6)",
    },
  },
});
