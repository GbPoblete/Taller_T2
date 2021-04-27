const express = require('express');
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded());

//RUTAS
app.use(require('./routes/RutasWeb'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
})