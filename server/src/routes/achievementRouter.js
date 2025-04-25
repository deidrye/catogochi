const express = require('express');
const AchievementController = require('../controllers/AchievementController');
const achievementRouter = express.Router();

// Работа с ачивками
achievementRouter
  .route('/')
  .get(AchievementController.getAllAchievements)
  .post(AchievementController.createAchievement);

achievementRouter
  .route('/:id')
  .get(AchievementController.getAchievementById)
  .put(AchievementController.updateAchievement)
  .delete(AchievementController.deleteAchievement);

// Работа с ачивками пользователя
achievementRouter.get('/user/:userId', AchievementController.getUserAchievements);
achievementRouter.post('/user/assign', AchievementController.assignAchievementToUser);
achievementRouter.delete('/user/remove', AchievementController.removeAchievementFromUser);

module.exports = achievementRouter;
