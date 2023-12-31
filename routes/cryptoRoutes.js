const express = require('express');
const userController = require('../controllers/cryptoController');

// Create an instance of Express Router

const router = express.Router();

/**
 * Route to get a list of top cryptocurrencies based on market cap in USD.
 * @route GET /api/cryptocurrencies
 * @group Cryptocurrency - Operations related to cryptocurrencies
 * @returns {Array} 200 - An array of cryptocurrency objects containing id and name
 * @throws {Error} 500 - Internal Server Error
 */

router.get('/cryptocurrencies', userController.getCryptoCurrencies);

/**
 * Route to convert a specified amount from a source cryptocurrency to a target currency.
 * @route POST /api/convert
 * @group Conversion - Operations related to currency conversion
 * @param {string} sourceCrypto.body.required - The source cryptocurrency ID
 * @param {number} amount.body.required - The amount to convert (non-negative number)
 * @param {string} targetCurrency.body.required - The target currency
 * @returns {Object} 200 - An object containing the converted amount
 * @throws {Error} 400 - Bad Request (Invalid input)
 * @throws {Error} 500 - Internal Server Error
 */

router.post('/convert', userController.convertCurrencies);

/**
 * Route to get a list of supported vs_currencies from the CoinGecko API.
 * @route GET /api/supportedcurrencies
 * @group Currency - Operations related to supported currencies
 * @returns {Array} 200 - An array of supported vs_currencies
 * @throws {Error} 500 - Internal Server Error
 */

router.get('/supportedcurrencies', userController.getSupportedCurrencies);

// Export the router for use in other parts of the application

module.exports = router;