const express = require('express');
const router = express.Router();

const PermisoController = require('../controllers/permisos.js');
const middleware = require('../middlewares/authorization');

router.post('/refresh',middleware.refreshToken);
router.use(middleware.verifyToken);

router.get('/', PermisoController.find);
router.get('/:id', PermisoController.findOne);
router.get('/byuser/:id', PermisoController.findByUser);
router.get('/byuser/:idUser/:idCarpeta', PermisoController.findByUserCarpeta);
router.post('/', PermisoController.create);
router.put('/:id', PermisoController.update);
router.delete('/:id', PermisoController.delete);

module.exports = router;