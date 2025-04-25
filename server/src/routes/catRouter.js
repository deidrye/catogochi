const express = require('express');
const CatController = require('../controllers/CatController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

const router = express.Router();

router.route('/').get(CatController.getAll).post(verifyAccessToken, CatController.create);
router
  .route('/:id')
  .get(CatController.getById)
  .put(CatController.update)
  .delete(CatController.delete);

module.exports = router;
