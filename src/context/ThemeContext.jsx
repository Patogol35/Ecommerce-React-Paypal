import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ThemeModeContext = createContext();

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("mode") || "light";
  });

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("mode", newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "dark" ? "#42a5f5" : "#1565c0",
            light: mode === "dark" ? "#64b5f6" : "#1976d2",
            dark: mode === "dark" ? "#1e88e5" : "#0d47a1",
            contrastText: "#ffffff",
          },

          secondary: {
            main: mode === "dark" ? "#f48fb1" : "#d81b60",
          },

          background: {
            default: mode === "dark" ? "#121212" : "#f4f6f8",
            paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
          },

          text: {
            primary: mode === "dark" ? "#ffffff" : "#111111",
            secondary: mode === "dark" ? "#b0b0b0" : "#555555",
          },

          divider: mode === "dark" ? "#2c2c2c" : "#e0e0e0",
        },

        typography: {
          fontFamily: "Inter, Roboto, Arial, sans-serif",
          h4: { fontWeight: 700 },
          h5: { fontWeight: 600 },
          button: { fontWeight: 600 },
        },

        shape: { borderRadius: 12 },

        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                transition: "0.3s",
              },
            },
          },

          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                textTransform: "none",
                fontWeight: 600,
              },
            },
          },

          MuiCssBaseline: {
  styleOverrides: {
    body: {
      backgroundColor: mode === "dark" ? "#121212" : "#f5f5f5",
      color: mode === "dark" ? "#ffffff" : "#111111",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
  },
},
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeModeContext);
}
