const styles = {
  root: {
    pb: { xs: 3, sm: 1 },
  },

  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    color: "primary.main",
    mt: 3,
    mb: 3,
  },

  headerIcon: {
    fontSize: 34,
  },

  footerBox: () => ({
    position: { xs: "fixed", sm: "static" },
    bottom: { xs: 20, sm: "auto" },
    left: { xs: "50%", sm: "auto" },
    transform: { xs: "translateX(-50%)", sm: "none" },

    width: { xs: "90%", sm: "100%" },
    maxWidth: { xs: 420, sm: "none" },

    backgroundColor: "transparent",
    boxShadow: "none",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.5,

    zIndex: 1200,
  }),

  divider: (theme) => ({
  width: "100%",
  height: "1px",
  border: "none",
  my: 1,

  // 🔥 color fijo sin interpolación rara
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.12)"
      : "rgba(0,0,0,0.12)",
}),

  total: (theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 1.2, 

  fontWeight: 700,
  fontSize: "0.9rem",

  color: "#fff",

  borderRadius: 20,
  px: 2.2,
  py: 0.7,

  background:
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.main,

  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 12px rgba(0,0,0,0.6)"
      : "0 4px 12px rgba(0,0,0,0.2)",
}),

  button: (theme) => ({
    py: 0.9,
    px: 3,
    fontWeight: 600,
    fontSize: "0.85rem",
    borderRadius: 20, // pill shape elegante

    background: theme.palette.primary.main,

    boxShadow:
      theme.palette.mode === "dark"
        ? "0 4px 14px rgba(0,0,0,0.6)"
        : "0 4px 14px rgba(0,0,0,0.15)",

    transition: "all 0.2s ease",

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 6px 18px rgba(0,0,0,0.7)"
          : "0 6px 18px rgba(0,0,0,0.25)",
    },
  }),

  emptyState: {
  mt: 8,
  textAlign: "center",
},

emptyIcon: {
  fontSize: 70,
  opacity: 0.5,
  mb: 1,
},

emptyTitle: (theme) => ({
  fontWeight: "bold",
  mb: 1,
  color: theme.palette.text.primary,
}),

emptySubtitle: (theme) => ({
  color:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.8)"
      : "#666",
  mb: 2,
}),

emptyButton: {
  mt: 1,
  borderRadius: 2,
},
};

export default styles;
