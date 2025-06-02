require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./db");

const app = express();
const port = process.env.PORT || 4000;

// CORS para desarrollo (en producción ya no necesitas esto si todo se sirve desde el mismo dominio)
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas backend
const usuariosRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRoutes);

const emparejamientosRoutes = require("./routes/emparejamientos");
app.use("/api/emparejamientos", emparejamientosRoutes);

const reservasRoutes = require("./routes/reservas");
app.use("/api/reservas", reservasRoutes);

const jugadoresRoutes = require("./routes/jugadores");
app.use("/api/jugadores", jugadoresRoutes);

// 👉 Servir archivos estáticos de Vue (después de hacer `npm run build`)
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
