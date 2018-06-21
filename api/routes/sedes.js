const express = require('express');
const router = express.Router();

const SedeController = require('../controllers/sedes.js');
const middleware = require('../middlewares/authorization');

const multipart = require('connect-multiparty');
const uploadImg = multipart({uploadDir: './uploads/sedes'});

router.post('/refresh',middleware.refreshToken);
router.use(middleware.verifyToken);

router.get('/', SedeController.find);
router.get('/:id', SedeController.findOne);
router.post('/', SedeController.create);
//router.post('/sede', SedeController.saveSede);
router.put('/:id', SedeController.update);
router.delete('/:id', SedeController.delete);
router.post('/upload-img-sede/:id',uploadImg, SedeController.upload);
router.get('/get-img-sede/:imageFile', SedeController.getImagen);

module.exports = router;