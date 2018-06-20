const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

const port = process.env.PORT || 6060;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Appfmcloud');
mongoose.Promise = global.Promise;

app.listen(port);
console.log('Ingresa al puerto ' + port);