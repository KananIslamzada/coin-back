const express = require('express');
const { postCoin, getCategoryCoins, getCoin, getCoins } = require('../controller/coinController');
const router = express.Router();

router.get("/categories/:name", getCategoryCoins)
router.post("/coins", getCoins)
router.get("/coin/:id", getCoin);
router.post("/", postCoin);

module.exports = router;