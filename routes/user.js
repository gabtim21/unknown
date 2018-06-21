const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const middleware = require('../middlewares/authorization');

router.post('/signup',userController.signup);
router.post('/signin',userController.signin);
router.post('/refresh',middleware.refreshToken);

router.use(middleware.verifyToken);

router.get('/',userController.find);
router.get('/:id',userController.findOne);
router.post('/',userController.create);
//router.put('/:id',userController.update);
//router.delete('/:id',userController.delete);

module.exports = router;
