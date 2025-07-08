const express = require('express');
const cors = require("cors");
const morgan=require("morgan");
const autorRouters=require("./routes/AutorRoutes.js");
const { default: helmet } = require('helmet');

const cursoRoutes = require('./routes/CursoRoutes.js');
const estudianteRoutes = require('./routes/EstudianteRoutes.js');
const inscripcionRoutes = require('./routes/InscripcionRoutes.js');

const app=express();

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use("/api",autorRouters)
app.use('/api', cursoRoutes);
app.use('/api', estudianteRoutes);
app.use('/api', inscripcionRoutes);

module.exports=app;