const Router = require('express');
const router = new Router();
import AuthController from '../controllers/authController';


const authController = new AuthController();
router.post('/registration', authController.registration)
router.post('/login', authController.login);
router.get('/users', authController.getUsers);

module.exports = router;