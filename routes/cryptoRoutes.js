const express = require('express');
const userController = require('../controllers/cryptoController');


const router = express.Router();


router.get('/cryptocurrencies', userController.getCryptoCurrencies);
router.post('/convert', userController.convertCurrencies);
router.get('/supportedcurrencies', userController.getSupportedCurrencies);


module.exports = router;