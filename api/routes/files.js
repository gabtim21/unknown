const express = require('express');
const router = express.Router();

const FilesController = require('../controllers/files.js');
const middleware = require('../middlewares/authorization');

const multipart = require('connect-multiparty');
const uploadImg = multipart({uploadDir: './uploads/files'});

router.post('/refresh',middleware.refreshToken);
router.use(middleware.verifyToken);

router.get('/', FilesController.find);
router.get('/:id', FilesController.findOne);
router.get('/bycarpeta/:id', FilesController.findByCarpeta);
router.post('/',uploadImg, FilesController.create);
//router.post('/sede', SedeController.saveSede);
router.put('/:id', FilesController.update);
router.delete('/:id', FilesController.delete);
router.post('/upload-img-files/:id',uploadImg, FilesController.upload);
router.get('/get-img-files/:imageFile', FilesController.getImagen);

module.exports = router;