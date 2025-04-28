const express = require('express');
const CatController = require('../controllers/CatController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const CatService = require('../services/CatService');

const router = express.Router();

router
  .route('/')
  .get(verifyAccessToken, CatController.getById)
  .post(verifyAccessToken, CatController.create)
  .put(verifyAccessToken, CatController.update);

router.get('/presets', verifyAccessToken, async (req, res) => {
  try {
    const presets = await CatService.getAllPresets();
    res.json(presets);
  } catch (error) {
    console.error('Error getting presets:', error);
    res.status(500).json({ error: error.message });
  }
});

router
  .route('/:id')
  .delete(verifyAccessToken, CatController.delete);

module.exports = router;
