const express = require('express');
const cors = require("cors");
const morgan=require("morgan");
const { default: helmet } = require('helmet');

const cursoRoutes = require('./routes/CursoRoutes.js');
const estudianteRoutes = require('./routes/EstudianteRoutes.js');
const inscripcionRoutes = require('./routes/InscripcionRoutes.js');
const rutasNavbar = require('./routes/RutasRoutes.js');

const app=express();

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

app.use('/api/cursos', cursoRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/inscripciones', inscripcionRoutes);
app.use('/api/rutas-navbar', rutasNavbar);
module.exports=app;