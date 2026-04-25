import { alpha } from "@mui/material/styles";

export const layoutStyles = (theme) => ({
  footer: {
  textAlign: "center",
  paddingTop: 16,
  paddingBottom: 16,
  marginTop: "auto",
  color: theme.palette.text.secondary,

  borderTop: `1px solid ${
    theme.palette.mode === "dark"
      ? alpha("#fff", 0.35)
      : alpha("#000", 0.25)
  }`,

  backgroundColor: theme.palette.background.paper,
  transition: "all 0.3s ease",
},
});
