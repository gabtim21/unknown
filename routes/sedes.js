const express = require('express');
const router = express.Router();

const SedeController = require('../controllers/sedes.js');

router.get('/', SedeController.find);
router.get('/:id', SedeController.findOne);
router.post('/', SedeController.create);
//router.post('/sede', SedeController.saveSede);
router.put('/:id', SedeController.update);
router.delete('/:id', SedeController.delete);


module.exports = router;