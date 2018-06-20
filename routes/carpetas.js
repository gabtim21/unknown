const express = require('express');
const router = express.Router();

const CarpetaController = require('../controllers/carpetas.js');

const multipart = require('connect-multiparty');
const uploadImg = multipart({uploadDir: './uploads/carpetas'})

router.get('/', CarpetaController.find);
router.get('/:id', CarpetaController.findOne);
router.post('/', CarpetaController.create);
//router.post('/sede', SedeController.saveSede);
router.put('/:id', CarpetaController.update);
router.delete('/:id', CarpetaController.delete);
router.post('/upload-img-carpeta/:id',uploadImg, CarpetaController.upload);
router.get('/get-img-carpeta/:imageFile', CarpetaController.getImagen);

module.exports = router;