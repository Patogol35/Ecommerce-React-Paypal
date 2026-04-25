import { alpha } from "@mui/material/styles";

export const layoutStyles = (theme) => ({
  footer: {
    mt: "auto",
    py: 3,
    px: 2,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1.2,

    textAlign: "center",

    background:
      theme.palette.mode === "dark"
        ? `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.9)}, ${theme.palette.background.default})`
        : `linear-gradient(180deg, ${theme.palette.background.paper}, ${alpha(theme.palette.grey[100], 0.6)})`,

    borderTop: `1px solid ${
      theme.palette.mode === "dark"
        ? alpha("#fff", 0.12)
        : alpha("#000", 0.08)
    }`,

    color: theme.palette.text.secondary,

    fontSize: "0.8rem",
    letterSpacing: "0.4px",
    lineHeight: 1.5,

    transition: "all 0.3s ease",
    opacity: 0.95,

    "&:hover": {
      opacity: 1,
    },
  },

  socialIcons: {
    display: "flex",
    gap: 1,

    "& .MuiIconButton-root": {
      color: theme.palette.text.secondary,
      transition: "all 0.25s ease",

      "&:hover": {
        color: theme.palette.primary.main,
        transform: "translateY(-2px) scale(1.1)",
      },
    },
  },
});
