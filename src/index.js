const express = require('express');
const rutas = require('./routes/index.js');

const app = express();

rutas.routes(app);

app.listen(4000, () => {
    console.log('running on 4000');
});