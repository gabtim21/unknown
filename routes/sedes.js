const express = require('express');
const router = express.Router();

const SedeController = require('../controllers/sedes.js');

const multipart = require('connect-multiparty');
const uploadImg = multipart({uploadDir: './uploads/sedes'})

router.get('/', SedeController.find);
router.get('/:id', SedeController.findOne);
router.post('/', SedeController.create);
//router.post('/sede', SedeController.saveSede);
router.put('/:id', SedeController.update);
router.delete('/:id', SedeController.delete);
router.post('/upload-img-sede/:id',uploadImg, SedeController.upload);
router.get('/get-img-sede/:imageFile', SedeController.getImagen);

module.exports = router;