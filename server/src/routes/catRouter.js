const express = require('express');
const CatController = require('../controllers/CatController');
const router = express.Router();

router.route('/').get(CatController.getAll).post(CatController.create);
router
  .route('/:id')
  .get(CatController.getById)
  .put(CatController.update)
  .delete(CatController.delete);

module.exports = router;
