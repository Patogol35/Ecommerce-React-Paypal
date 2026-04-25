import { alpha } from "@mui/material/styles";

export const layoutStyles = (theme) => ({
  footer: {
    textAlign: "center",
    paddingTop: 24,
    paddingBottom: 24,
    marginTop: "auto",
    color: theme.palette.text.secondary,
    borderTop: `1px solid ${
      theme.palette.mode === "dark"
        ? alpha("#fff", 0.45)
        : alpha("#000", 0.45)
    }`,

    backgroundColor: theme.palette.background.paper,
    transition: "background-color 0.3s ease",
  },
});
