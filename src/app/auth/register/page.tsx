"use client";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { useRouter } from 'next/navigation'

function RegisterForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setFirstName(data.get("firstName") as string);
    setLastName(data.get("lastName") as string);
    setEmail(data.get("email") as string);
    setPassword(data.get("password") as string);
    setRepassword(data.get("repassword") as string);
    if (
      data.get("firstName") === "" ||
      data.get("lastName") === "" ||
      data.get("email") === "" ||
      data.get("password") === "" ||
      String(data.get("password")).length < 8
    ) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    if (data.get("password") !== data.get("repassword")) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    setLoading(true);
    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error en la llamada al servidor");
        }
      })
      .then((data) => {
        console.log(data)
        if (data.error) {
          setErrorText(data.error);
          setLoading(false);
          return;
        }
        if(data.status === 201)
        {
          router.push("/auth/signin");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
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
        Registrarse
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="Nombres"
              autoFocus
              error={error && firstName === "" ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Apellidos"
              name="lastName"
              autoComplete="family-name"
              error={error && lastName === "" ? true : false}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              error={error && email === "" ? true : false}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
              error={
                (error && password == "") || (error && password.length < 8)
                  ? true
                  : false
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="repassword"
              label="Repetir Contraseña"
              type="password"
              id="repassword"
              autoComplete="re-password"
              error={
                (error && password == "") || (error && password.length < 8)
                  ? true
                  : false
              }
            />
          </Grid>
        </Grid>
        {(password !== repassword) && (
          <Grid item xs={12}>
            <Typography component="label" color="error">
              Las contraseñas no coinciden
            </Typography>
          </Grid>
        )}
        {error && (
          <Grid item xs={12}>
            <Typography component="label" color="error">
              {error && password.length < 8 && password != ""
                ? "La contraseña debe contener al menos 8 caracteres"
                : "Por favor complete todos los campos"}
            </Typography>
          </Grid>
        )}
        {errorText !== "" && (
          <Grid item xs={12}>
            <Typography component="label" color="error">
              El correo electrónico ya está registrado
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
              <Box sx={{ ml: 1 }}>Registrando</Box>
            </Box>
          ) : (
            "Registrarme"
          )}
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/auth/signin">
              ¿Ya tienes una cuenta? Inicia Sesión
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default RegisterForm;
