const styles = {
appBar: (theme, scrolled) => ({
backgroundColor:
theme.palette.mode === "dark" ? "#121212" : "#1976d2",
boxShadow: scrolled
? "0 4px 20px rgba(0,0,0,0.35)"
: "none",
transition: "background-color .3s ease, box-shadow .3s ease",
zIndex: 1400,
}),

toolbar: {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
},

logo: {
display: "flex",
alignItems: "center",
gap: 1,
fontWeight: "bold",
textDecoration: "none",
},

logoIcon: {
fontSize: 28,
background: "linear-gradient(135deg, #FF5722, #FFC107)",
WebkitBackgroundClip: "text",
WebkitTextFillColor: "transparent",
},

desktopMenu: {
display: { xs: "none", lg: "flex" },
gap: 2,
alignItems: "center",
},

menuBtnMobile: {
display: { xs: "block", lg: "none" },
},

iconCenter: {
display: "flex",
alignItems: "center",
justifyContent: "center",
height: 40,
width: 40,
},

drawerPaper: (theme) => ({
width: 280,
backgroundColor:
theme.palette.mode === "dark" ? "#1e1e1e" : "#1976d2",
color: "#fff",
borderRadius: "16px 0 0 16px",
p: 2,
}),

drawerStack: {
flex: 1,
mt: 8,
},

userSection: (isMobile) => ({
my: isMobile ? 2 : 0,
textAlign: "center",
mt: isMobile ? 12 : 0,
}),

logoutBtn: (theme) => ({
  fontSize: "1.05rem",
  fontWeight: 600,
  color: "#fff",
  borderRadius: "12px",
  textTransform: "none",
  width: "100%",
  py: 1.2,
  transition: "all 0.25s ease",

  background: {
    xs: "#d32f2f",
    md: "transparent",
  },

  "& .MuiButton-startIcon": { color: "#fff" },

  "&:hover": {
    boxShadow: "0 0 12px rgba(0,0,0,0.25)",
    filter: "brightness(1.1)",
  },

  ...(theme.palette.mode === "dark" && {
    "&:hover": {
      filter: "brightness(1.2)",
    },
  }),
}),

drawerUtilStack: {
mt: 3,
pb: 2,
},

toggleIcon: {
color: "#fff",
width: 48,
height: 48,
},
};

export default styles;
