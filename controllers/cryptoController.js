const axios = require('axios');

// Utility function to wait for a specified duration
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// /**
//  * Fetches a list of top cryptocurrencies based on market cap in USD.
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */

const getCryptoCurrencies = async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 100,
                page: 1,
                sparkline: false,
            },
        });

        const currencies = response.data.map((crypto) => ({
            id: crypto.id,
            name: crypto.name,
        }));

        res.json(currencies);

    } catch (error) {
        console.error(error);

        if (error.response && error.response.status === 429) {

            const retryAfter = parseInt(error.response.headers['retry-after']) || 5;
            await wait(retryAfter * 1000);
            return getCryptoCurrencies(req, res);
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// /**
//  * Fetches a list of supported vs_currencies from the CoinGecko API.
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */

const getSupportedCurrencies = async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
      

        res.json(response.data);

    } catch (error) {
        console.error(error);

        if (error.response && error.response.status === 429) {

            const retryAfter = parseInt(error.response.headers['retry-after']) || 5;
            await wait(retryAfter * 1000);
            return getSupportedCurrencies(req, res);
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// /**
//  * Converts a specified amount from a source cryptocurrency to a target currency.
//  * @param {Object} req - Express request object with body containing sourceCrypto, amount, and targetCurrency
//  * @param {Object} res - Express response object
//  */

const convertCurrencies = async (req, res) => {
    const { sourceCrypto, amount, targetCurrency } = req.body;

    if (!sourceCrypto || !amount || !targetCurrency) {
        return res.status(400).json({ error: 'fields should not be empty.' });
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount < 0) {
        return res.status(400).json({ error: ' amount should be a non-negative number.' });
    }

    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: sourceCrypto,
                vs_currencies: targetCurrency,
            },
        });

        const conversionRate = response.data[sourceCrypto][targetCurrency];
        const convertedAmount = amount * conversionRate;

        res.json({ convertedAmount });
    } catch (error) {

        console.error(error);
        if (error.response && error.response.status === 429) {

            const retryAfter = parseInt(error.response.headers['retry-after']);
            await wait(retryAfter * 1000);
            return convertCurrencies(req, res);
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// Exports the functions for use in other parts of the application

module.exports = {
    getCryptoCurrencies,
    convertCurrencies,
    getSupportedCurrencies
};