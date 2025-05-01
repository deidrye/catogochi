const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');
const { verifyRefreshToken } = require('../middlewares/verifyTokens');

authRouter.post('/register', AuthController.signUp);
authRouter.post('/login', AuthController.logIn);
authRouter.post('/logout', AuthController.logOut);
authRouter.get('/me', verifyRefreshToken, AuthController.checkAuth);

module.exports = authRouter;
