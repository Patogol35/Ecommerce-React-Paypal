import { useState, useCallback } from "react";
import { login as apiLogin } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonOutline from "@mui/icons-material/PersonOutline";
import LockOutlined from "@mui/icons-material/LockOutlined";

import { GoogleLogin } from "@react-oauth/google";

import loginStyles from "./Login.styles";

// =====================
// VALIDACIONES
// =====================
const validators = {
  username: (v) => (!v.trim() ? "El usuario es obligatorio" : null),
  password: (v) => (!v.trim() ? "La contraseña es obligatoria" : null),
};

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // =====================
  // HANDLERS
  // =====================
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const validateForm = useCallback(() => {
    for (const key in validators) {
      const error = validators[key](form[key]);
      if (error) {
        toast.error(error);
        return false;
      }
    }
    return true;
  }, [form]);

  const handleErrors = useCallback((error) => {
    const data = error?.response?.data;
    const status = error?.response?.status;

    let message =
      data?.message ||
      data?.detail ||
      (status === 401 && "Usuario o contraseña incorrectos");

    if (!message) {
      toast.error("Ocurrió un error al iniciar sesión");
      return;
    }

    if (message.toLowerCase().includes("credentials")) {
      message = "Usuario o contraseña incorrectos";
    }

    toast.error(message);
  }, []);

  // =====================
  // LOGIN NORMAL
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || !validateForm()) return;

    setLoading(true);
    try {
      const data = await apiLogin(form);

      if (!data?.access || !data?.refresh) {
        toast.error("Credenciales inválidas");
        return;
      }

      login(data.access, data.refresh);
      toast.success(`Bienvenido/a, ${form.username} 👋`);
      navigate("/");
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // LOGIN GOOGLE
  // =====================
  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      return toast.error("Error con Google");
    }

    try {
      const res = await fetch(
        "https://backvariantes.onrender.com/api/google-login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: credentialResponse.credential,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error con Google");
      }

      login(data.access, data.refresh);
      toast.success("Bienvenido con Google");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error al iniciar con Google");
    }
  };

  return (
    <Container maxWidth="xs" sx={loginStyles.container(theme)}>
      <Paper elevation={8} sx={loginStyles.paper(theme)}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={loginStyles.titulo(theme)}
        >
          Bienvenido
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={loginStyles.subtitulo}
        >
          Ingresa tus credenciales para continuar
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Usuario */}
          <TextField
            name="username"
            label="Usuario"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Contraseña */}
          <TextField
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* BOTONES */}
          <Box mt={3} display="flex" flexDirection="column" gap={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={loginStyles.botonLogin(theme)}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Iniciar sesión"
              )}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/register")}
              sx={loginStyles.botonRegister(theme)}
            >
              Registrarse
            </Button>
          </Box>
        </form>

        {/* DIVIDER */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            o continuar con
          </Typography>
        </Box>

        {/* GOOGLE LOGIN */}
        <Box mt={2} display="flex" justifyContent="center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Error con Google")}
          />
        </Box>
      </Paper>
    </Container>
  );
        }
