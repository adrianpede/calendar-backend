
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');



// Crear el servidor de express
const app = express();

// base de datos
dbConnection();

// Directorio publico 
app.use(express.static('public'));

// Lectura del body
app.use(express.json());



// Rutas
//Todo: auth, crear, login, renew
app.use('/api/auth', require('./routes/auth'));
//Todo: CRUD: eventos 





// Escuchar peticiones 
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
