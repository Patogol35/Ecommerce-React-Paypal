import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import navButtonStyles from "./NavButton.styles";

function NavButton({ item, onClick }) {
const location = useLocation();
const isActive = location.pathname === item.path;
const Icon = item.icon;
const alwaysColoredPaths = ["/login", "/register"];

return (
<motion.div whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }}>
<Button
component={Link}
to={item.path}
startIcon={<Icon />}
onClick={onClick}
aria-current={isActive ? "page" : undefined}
sx={(theme) => navButtonStyles(theme, isActive, item, alwaysColoredPaths)}
>
{item.label}
</Button>
</motion.div>
);
}

export default React.memo(NavButton);
