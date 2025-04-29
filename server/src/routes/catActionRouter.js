const express = require('express');
const CatActionController = require('../controllers/CatActionController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

const router = express.Router();

router.get('/', verifyAccessToken, CatActionController.getAll);
router.post('/apply', verifyAccessToken, CatActionController.applyAction);

module.exports = router;
