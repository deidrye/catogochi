const express = require('express');
const UserLogController = require('../controllers/UserLogController');
const userLogRouter = express.Router();

// Основные маршруты для логов
userLogRouter
  .route('/')
  .get(UserLogController.getAllLogs)
  .post(UserLogController.createLog);

userLogRouter
  .route('/:id')
  .get(UserLogController.getLogById)
  .put(UserLogController.updateLog)
  .delete(UserLogController.deleteLog);

// Маршруты для логов конкретного пользователя
userLogRouter.get('/user/:userId/', UserLogController.getUserLogs);
userLogRouter.get('/user/:userId/of', UserLogController.getUserLogsByType);

module.exports = userLogRouter;
