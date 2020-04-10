const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const routesv1 = require('./routes/v1/index');

const app = express();

console.log('MONGO', process.env.MONGO);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())


routesv1(app);

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to mongodb');
    app.listen(PORT, () => {
        console.log('running on:', PORT);
    });
}).catch(error => {
    console.log('mongodb error', error);
})