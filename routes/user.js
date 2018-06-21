const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const middleware = require('../middlewares/authorization');

const multipart = require('connect-multiparty');
const uploadImg = multipart({uploadDir: './uploads/users'});

router.post('/signup',UserController.signup);
router.post('/signin',UserController.signin);
router.post('/refresh',middleware.refreshToken);

router.use(middleware.verifyToken);

router.get('/',UserController.find);
router.get('/:id',UserController.findOne);
router.post('/',UserController.create);
router.put('/:id',UserController.update);
router.delete('/:id',UserController.delete);
router.post('/upload-img-user/:id',uploadImg, UserController.upload);
router.get('/get-img-users/:imageFile', UserController.getImagen);


module.exports = router;