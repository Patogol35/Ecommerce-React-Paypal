const carritoItemStyles = {
card: (theme) => ({
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  mb: 3,
  mx: { xs: 2, sm: 0 },
  borderRadius: 4,

  border: "1px solid",
  borderColor: theme.palette.divider,

  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,

  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 14px rgba(0,0,0,0.6)"
      : "0 4px 12px rgba(0,0,0,0.12)",

  transition: "all 0.3s ease",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 8px 24px rgba(0,0,0,0.8)"
        : "0 8px 24px rgba(0,0,0,0.2)",
  },
}),
media: (theme) => ({
  width: { xs: "100%", sm: 180 },
  height: { xs: 200, sm: 180 },
  objectFit: "contain",
  borderRadius: { xs: "16px 16px 0 0", sm: "16px 0 0 16px" },

  bgcolor: theme.palette.action.hover,

  p: 2,
  transition: "transform 0.35s ease",

  "&:hover": { transform: "scale(1.08)" },
}),

content: {
flex: 1,
display: "flex",
flexDirection: "column",
justifyContent: "space-between",
p: 2.5,
gap: 1,
},

titulo: {
fontWeight: 600,
fontSize: "1.1rem",
lineHeight: 1.4,
mb: 0.5,
},

descripcion: {
display: "-webkit-box",
WebkitLineClamp: 2,
WebkitBoxOrient: "vertical",
overflow: "hidden",
textOverflow: "ellipsis",
color: "text.secondary",
fontSize: "0.9rem",
mb: 1.5,
},

chipSubtotal: {
fontWeight: "bold",
fontSize: "0.95rem",
},

chipStock: {
fontWeight: "bold",
fontSize: "0.85rem",
opacity: 0.8,
},

controlesWrapper: (theme) => ({
  display: "flex",
  flexDirection: { xs: "row", sm: "column" },
  justifyContent: "center",
  alignItems: "center",
  p: 2,
  gap: 1.5,

  borderLeft: { sm: `1px solid ${theme.palette.divider}` },
  borderTop: { xs: `1px solid ${theme.palette.divider}`, sm: "none" },
}),

cantidadWrapper: {
display: "flex",
alignItems: "center",
gap: 1,
bgcolor: "action.hover",
borderRadius: 2,
px: 1,
py: 0.5,
},

botonCantidad: {
minWidth: 32,
minHeight: 32,
borderRadius: "50%",
bgcolor: "background.paper",
boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
"&:hover": {
bgcolor: "action.hover",
transform: "scale(1.1)",
},
transition: "all 0.2s ease",
},

cantidadInput: {
width: 50,
"& input": {
textAlign: "center",
fontWeight: "bold",
fontSize: "1rem",
borderRadius: 2,
},
},

botonEliminar: {
color: "error.main",
borderRadius: 2,
px: 2,
"&:hover": { bgcolor: "rgba(211,47,47,0.1)" },
},
};

export default carritoItemStyles;

  
