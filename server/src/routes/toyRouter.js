const express = require('express');
const ToyController = require('../controllers/ToyController');
const router = express.Router();

router.route('/').post(ToyController.create);

router.route('/:catId').get(ToyController.getAll); // Получение всех игрушек из магазина c статусом купленности

router.route('/owned/:catId').get(ToyController.getOwnedToys); // Получение купленных игрушек конкретного кота

router.post('/buy', ToyController.buyToy);

router
  .route('/:id')
  .get(ToyController.getById)
  .put(ToyController.update)
  .delete(ToyController.delete);

// router.get('/:catId', ToyController.getToys);

module.exports = router;
