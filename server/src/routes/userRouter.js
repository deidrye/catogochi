const express = require('express');
const UserController = require('../controllers/UserController');
const userRouter = express.Router();

userRouter.route('/').get(UserController.getAll).post(UserController.createUser);
userRouter
  .route('/:id')
  .get(UserController.getById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

userRouter.patch('/:id/make-admin', UserController.makeUserAdmin);
userRouter.get('/:id/password', UserController.takeUserPassword);

module.exports = userRouter;
