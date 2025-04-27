const express = require('express');
const ToyController = require('../controllers/ToyController');
const router = express.Router();

router.route('/').get(ToyController.getAll).post(ToyController.create)

router.post('/buy', ToyController.buyToy);

router
  .route('/:id')
  .get(ToyController.getById)
  .put(ToyController.update)
  .delete(ToyController.delete);

module.exports = router;
