const express = require('express');
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded());

//RUTAS
app.use(require('./routes/RutasWeb'));

app.listen(3000);
console.log('estoy escuchando puerto 3000')