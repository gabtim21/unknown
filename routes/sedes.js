const express = require('express');
const router = express.Router();

const SedeController = require('../controllers/sedes');

router.get('/', SedeController.find);
router.get('/:id',SedeController.findOne);
router.get('/',SedeController.create);
router.put('/:id', SedeController.update);
router.delete('/:id', SedeController.delete);


module.exports = router;