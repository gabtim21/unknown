const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.js');

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.post('/refresh', UserController.refreshToken);

router.get('/',UserController.find);
router.get('/:id',UserController.findOne);
router.post('/',UserController.create);
router.put('/:id',UserController.update);
router.delete('/:id',UserController.delete);

module.exports = router;