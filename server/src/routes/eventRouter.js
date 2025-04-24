const express = require('express');
const EventController = require('../controllers/EventController');
const router = express.Router();

router.route('/').get(EventController.getAll).post(EventController.create);
router
  .route('/:id')
  .get(EventController.getById)
  .put(EventController.update)
  .delete(EventController.delete);

module.exports = router;
