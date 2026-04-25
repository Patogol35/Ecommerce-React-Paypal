
import { alpha } from "@mui/material/styles";
const styles = {
  loadingBox: {
    mt: 8,
    display: "flex",
    justifyContent: "center",
  },
  header: {
    mb: 4,
    textAlign: "center",
  },
  headerTitle: {
    color: "primary.main",
    mt: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  filtersContainer: (theme) => ({
  p: 3,
  borderRadius: 3,
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  gap: 2,
  justifyContent: "center",
  alignItems: "center",
  mb: 4,

  transition: "all 0.25s ease",

  //  Theme 
  bgcolor: theme.palette.background.paper,

  border: "1px solid",
borderColor:
  theme.palette.mode === "dark"
    ? alpha("#fff", 0.45)
    : alpha("#000", 0.45),

  boxShadow:
    theme.palette.mode === "dark"
      ? "0 6px 18px rgba(0,0,0,0.5)"
      : "0 6px 16px rgba(0,0,0,0.1)",

  "&:hover": {
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 8px 22px rgba(0,0,0,0.7)"
        : "0 8px 20px rgba(0,0,0,0.15)",
  },
}),
  searchField: {
    minWidth: 250,
  },
  categoryField: {
    minWidth: 200,
  },
  sortField: {
    minWidth: 220,
  },
  paginationBox: {
    mt: 4,
    display: "flex",
    justifyContent: "center",
  },
  carritoBtn: {
    position: "fixed",
    bottom: 24,
    right: 24,
    bgcolor: "primary.main",
    color: "white",
    "&:hover": { bgcolor: "primary.dark" },
  },
};

export default styles;
