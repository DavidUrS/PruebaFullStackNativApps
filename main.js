const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const userRoutes = require('./routes/users_routes');
const courseRoutes = require('./routes/courses_routes');
const teacherRoutes = require('./routes/teachers_routes');
const studenRoutes = require('./routes/students_routes');

// Connect to database
mongoose.connect('mongodb://admin:11111111David@ds221242.mlab.com:21242/prueba_nativapps',{
}).then(()=>{
    console.log("Conectado a la base de datos");
}).catch((err)=>{
    console.log("Error al conectarse a la base de datos");
});

// Variable de puerto
let port = process.env.port || 3000;

// Middlewares
app.use(morgan('dev'))
app.use(express.json()) 
app.use(express.urlencoded({extended:false}))
app.use(cors())

// Lanzando archivos estaticos de produccion de angular
app.use(express.static(path.join(__dirname,'dist/client')));

// Definiendo rutas de las apis
app.use('/users',userRoutes);
app.use('/courses',courseRoutes);
app.use('/teachers',teacherRoutes);
app.use('/students',studenRoutes); 

// Levantando el servidor
server.listen(port,()=>{
    console.log(`Servidor en puerto ${port}`);
})