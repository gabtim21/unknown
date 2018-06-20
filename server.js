const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

const port = process.env.PORT || 6060;

app.use("/", function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
});

const router = express.Router();

const userRouter = require('./routes/user');
const userSede = require('./routes/sedes');


router.use('/user', userRouter);
router.use('/user/sedes', userSede);


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Appfmcloud');
mongoose.Promise = global.Promise;

app.listen(port);
console.log('Ingresa al puerto' + port);