const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

authRouter.post('/register', AuthController.signUp);
authRouter.post('/login', AuthController.logIn);
authRouter.post('/logout', AuthController.logOut);
authRouter.get('/me', verifyAccessToken, AuthController.checkAuth);

module.exports = authRouter;
