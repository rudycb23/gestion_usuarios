"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";

import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Card,
} from "@mui/material";

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [error, setError] = useState("");

  // Cargar usuarios desde localStorage al montar el componente
  useEffect(() => {
    const usuariosAlmacenados =
      JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(usuariosAlmacenados);
  }, []);

  // Guardar en localStorage cuando cambia la lista de usuarios
  useEffect(() => {
    if (usuarios.length > 0) {
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  }, [usuarios]);

  // Funcion para agregar un usuario
  const agregarUsuario = useCallback(() => {
    if (nuevoUsuario.trim() === "") {
      setError("El nombre de usuario no puede ser vacio");
      return;
    }
    setUsuarios((prevUsuarios) => [
      ...prevUsuarios,
      { name: nuevoUsuario, count: 0 },
    ]);
    setNuevoUsuario("");
    setError("");
  }, [nuevoUsuario]);

  // Eliminar un usuario
  const borrarUsuario = (index) => {
    try {
      setUsuarios((prevUsuarios) => prevUsuarios.filter((_, i) => i !== index));
      setError("");
    } catch (err) {
      setError("Error al eliminar el usuario");
    }
  };

  // Funcion para incrementar el contador de un usuario
  const incrementarContador = useCallback((index) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario, i) =>
        i === index ? { ...usuario, count: usuario.count + 1 } : usuario
      )
    );
  }, []);

  // Memorizar la lista de usuarios para evitar renders innecesarios
  const listaUsuarios = useMemo(() => {
    return usuarios.map((usuario, index) => (
      <Card
        sx={{ mb: 2, p: 2 }}
        key={index}
        style={{
          background: "linear-gradient(160deg, #045280 1%, #80D0C7 95%)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box style={{ flexGrow: 1 }}>
          <ListItemText primary={usuario.name} sx={{ color: "white" }} />

          <Typography variant="body2" color="lightgray">
            Contador: {usuario.count}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => incrementarContador(index)}
          style={{ margin: "0 0.2rem" }}
        >
          Incrementar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => borrarUsuario(index)}
          style={{ margin: "0 0.2rem" }}
        >
          Eliminar
        </Button>
      </Card>
    ));
  }, [usuarios]);

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios Activos
      </Typography>

      {/* Mensaje de error */}
      {error && (
        <Typography color="error" style={{ marginBottom: "10px" }}>
          {error}
        </Typography>
      )}

      {/* Campo para agregar usuario */}
      <TextField
        label="Nuevo usuario"
        variant="outlined"
        fullWidth
        value={nuevoUsuario}
        onChange={(e) => setNuevoUsuario(e.target.value)}
        style={{ marginBottom: "10px" }}
        InputLabelProps={{ style: { color: "white" } }}
        InputProps={{ style: { color: "white" } }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "lightgray" },
            "&.Mui-focused fieldset": { borderColor: "white" },
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={agregarUsuario}
        fullWidth
        style={{ marginBottom: "10px" }}
      >
        Agregar Usuario
      </Button>

      {/* Lista de usuarios */}
      <List>{listaUsuarios}</List>

      {/* Pie de página */}
      <div className={styles.page}>
        <main className={styles.main}></main>
        <footer className={styles.footer}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ul>
            <li>
              Ing. Rudy Campos <code>Front-end developer </code>React/Next.js.
            </li>
            <li>
              <code>Trained web developer </code>Universidad Cenfotec
              <code> & </code>
              Universidad Americana
            </li>
          </ul>
        </footer>
      </div>
    </Container>
  );
}
