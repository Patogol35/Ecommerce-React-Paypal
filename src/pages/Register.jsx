import { useState, useMemo, useCallback } from "react";
import { register as apiRegister } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  LinearProgress,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import {
  Visibility,
  VisibilityOff,
  PersonOutline,
  EmailOutlined,
  LockOutlined,
} from "@mui/icons-material";

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

import registerStyles from "./Register.styles";

// ---------- HELPERS ----------
const getPasswordStrength = (pwd = "") => {
  let score = 0;
  if (pwd.length >= 6) score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 2) return { label: "Débil", color: "red", value: 40 };
  if (score === 3) return { label: "Media", color: "orange", value: 60 };
  if (score === 4) return { label: "Fuerte", color: "green", value: 80 };
  return { label: "Muy fuerte", color: "darkgreen", value: 100 };
};

const validators = {
  username: (v) => {
    if (!v.trim()) return "El usuario es obligatorio";
    if (/\s/.test(v)) return "El usuario no puede contener espacios";
    return null;
  },
  email: (v) => {
    if (!v.trim()) return "El correo es obligatorio";
    if (!/\S+@\S+\.\S+/.test(v)) return "El correo no es válido";
    return null;
  },
  password: (v) => {
    if (v.length < 6) return "La contraseña debe tener al menos 6 caracteres";
    if (!/[0-9]/.test(v)) return "La contraseña debe incluir al menos un número";
    if (!/[^A-Za-z0-9]/.test(v))
      return "La contraseña debe incluir al menos un símbolo";
    return null;
  },
  confirm: (v, data) => {
    if (v !== data.password) return "Las contraseñas no coinciden";
    return null;
  },
};

export default function Register() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateForm = () => {
    for (const key in validators) {
      const error = validators[key](form[key], form);
      if (error) {
        toast.error(error);
        return false;
      }
    }
    return true;
  };

  const strength = useMemo(
    () => getPasswordStrength(form.password),
    [form.password]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || authenticating) return;
    if (!validateForm()) return;

    setLoading(true);

    try {
      await apiRegister({
        username: form.username.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
      });

      toast.success("Usuario registrado correctamente");
      navigate("/login");
    } catch (error) {
      const resp = error?.response?.data;

      const traducirUsuario = (msg) => {
        if (msg === "A user with that username already exists.") {
          return "El nombre de usuario ya está registrado";
        }
        return msg;
      };

      if (resp?.username?.[0])
        toast.error(traducirUsuario(resp.username[0]));
      else if (resp?.email?.[0])
        toast.error(resp.email[0]);
      else if (resp?.password?.[0])
        toast.error(resp.password[0]);
      else if (Array.isArray(resp))
        toast.error(resp[0]);
      else toast.error("Ocurrió un error en el registro");
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // GOOGLE
  // =====================
  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      return toast.error("Error con Google");
    }

    setAuthenticating(true);

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
      toast.success("Autenticado con Google 👌");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error al iniciar con Google");
    } finally {
      setAuthenticating(false);
    }
  };

  const renderInput = (label, name, icon, type = "text", auto = "") => (
    <TextField
      label={label}
      name={name}
      type={type}
      fullWidth
      margin="normal"
      value={form[name]}
      onChange={handleChange}
      required
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
      autoComplete={auto}
    />
  );

  // SPINNER GLOBAL
  if (authenticating) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xs" sx={registerStyles.container(theme)}>
      <Paper elevation={8} sx={registerStyles.paper(theme)}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={registerStyles.titulo(theme)}
        >
          Crear cuenta
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={registerStyles.subtitulo}
        >
          Completa tus datos para registrarte
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          {renderInput(
            "Usuario",
            "username",
            <PersonOutline color="action" />,
            "text",
            "username"
          )}

          {renderInput(
            "Correo",
            "email",
            <EmailOutlined color="action" />,
            "email",
            "email"
          )}

          {renderInput(
            "Contraseña",
            "password",
            <LockOutlined color="action" />,
            showPasswords ? "text" : "password",
            "new-password"
          )}

          {form.password && (
            <Box sx={registerStyles.strengthBox}>
              <LinearProgress
                variant="determinate"
                value={strength.value}
                sx={registerStyles.strengthBar(theme, strength.color)}
              />
              <Typography
                variant="caption"
                sx={registerStyles.strengthLabel(strength.color)}
              >
                {strength.label}
              </Typography>
            </Box>
          )}

          {renderInput(
            "Confirmar contraseña",
            "confirm",
            <LockOutlined color="action" />,
            showPasswords ? "text" : "password",
            "new-password"
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={showPasswords}
                onChange={() => setShowPasswords((s) => !s)}
                icon={<VisibilityOff />}
                checkedIcon={<Visibility />}
              />
            }
            label="Mostrar contraseñas"
            sx={registerStyles.checkbox}
          />

          <Box mt={3} display="flex" flexDirection="column" gap={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading || authenticating}
              sx={registerStyles.boton(theme)}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Registrarse"
              )}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/login")}
            >
              Ya tengo cuenta
            </Button>
          </Box>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            o continuar con
          </Typography>
        </Box>

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
