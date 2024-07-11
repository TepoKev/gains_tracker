"use client";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [credentialsError, setCredentialsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    setEmail(data.get("email") as string);
    setPassword(data.get("password") as string);
    if (data.get("email") === "" || data.get("password") === "") {
      setError(true);
      return null;
    }
    setError(false);
    const res = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (!res?.ok) {
      setCredentialsError(true);
      return;
    } else {
      setCredentialsError(false);
    }
    router.push("/dashboard");
    
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Inicio de Sesión
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo Electrónico"
          name="email"
          autoComplete="email"
          autoFocus
          error={error && email === "" ? true : false}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
          error={error && password === "" ? true : false}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Recuerdame"
        />
        {credentialsError && (
          <Grid item xs={12}>
            <Typography component="label" color="error">
              El email o la contreseña es incorrecto
            </Typography>
          </Grid>
        )}
        {error && (
          <Grid item xs={12}>
            <Typography component="label" color="error">
              Todos los campos son requeridos
            </Typography>
          </Grid>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="secondary" />
              <Box sx={{ ml: 1 }}>Iniciando Sesión</Box>
            </Box>
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#">¿Olvidaste tu contraseña?</Link>
          </Grid>
          <Grid item>
            <Link href="/auth/register">
              {"¿Aun no tienes una cuenta? Registrate aquí"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
