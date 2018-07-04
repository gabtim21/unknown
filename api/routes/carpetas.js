const express = require('express');
const router = express.Router();

const CarpetaController = require('../controllers/carpetas.js');
const middleware = require('../middlewares/authorization');

const multipart = require('connect-multiparty');
const uploadImg = multipart({uploadDir: './uploads/carpetas'});

router.post('/refresh',middleware.refreshToken);
router.use(middleware.verifyToken);

router.get('/', CarpetaController.find);
router.get('/:id', CarpetaController.findOne);
router.get('/bysede/:id', CarpetaController.findBySede);
router.post('/', uploadImg, CarpetaController.create);
//router.post('/sede', SedeController.saveSede);
router.put('/:id', CarpetaController.update);
router.delete('/:id', CarpetaController.delete);
router.post('/upload-img-carpeta/:id',uploadImg, CarpetaController.upload);
router.get('/get-img-carpeta/:imageFile', CarpetaController.getImagen);

module.exports = router;