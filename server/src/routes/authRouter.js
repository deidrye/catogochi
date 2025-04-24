const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');

authRouter.post('/register', AuthController.signUp);
authRouter.post('/login', AuthController.logIn);
authRouter.post('/logout', AuthController.logOut);

module.exports = authRouter;
