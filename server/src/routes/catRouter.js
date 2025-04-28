const express = require('express');
const CatController = require('../controllers/CatController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const CatService = require('../services/CatService');

const router = express.Router();

router.route('/').get(CatController.getAll).post(verifyAccessToken, CatController.create);

// Роут для пресетов должен быть перед роутом с параметром :id
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
  .get(CatController.getById)
  .put(CatController.update)
  .delete(CatController.delete);

module.exports = router;
