const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
limit: '50mb',
parameterLimit: 100000,
extended: true
}));

app.use(bodyParser.json());

const port = process.env.PORT || 6060;

app.use("/", function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
});

app.options("/*", function(req, res, next){
	res.sendStatus(200);
});

const router = express.Router();

router.get('/', function(req, res){
	res.json({message: 'Welcome my friends :)'});	
});




const userRouter = require('./routes/user');
const sedeRouter = require('./routes/sedes');
const carpetaRouter = require('./routes/carpetas');
const fileRouter = require('./routes/files');


router.use('/user', userRouter);
router.use('/sedes', sedeRouter);
router.use('/carpetas', carpetaRouter);
router.use('/files', fileRouter);

app.use('/api', router);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Appfmcloud');
mongoose.Promise = global.Promise;

app.listen(port);
console.log('Ingresa al puerto ' + port);