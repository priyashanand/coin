const axios = require('axios');
require('dotenv').config();
const Price = require('./models')

exports.fetchStats = async (ids) => {
    const options = {
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=false`,
        headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.COINGECKO_API }
    };
    const response = await axios.request(options);
    return response.data;
};

exports.storePriceData = async (data) => {
    try {
        for (const [currency, info] of Object.entries(data)) {
            const newPrice = new Price({ currency, price: info.usd });
            await newPrice.save();
            console.log(`Price data saved for ${currency}:`, newPrice);
        }
    } catch (error) {
        console.error('Failed to store price data:', error.message);
    }
};


exports.fetchAndStoreStats = async () => {
    try {
        const ids = 'bitcoin,ethereum,matic-network';
        const data = await exports.fetchStats(ids);
        await exports.storePriceData(data);
    } catch (error) {
        console.error('Failed to fetch and store data:', error.message);
    }
};

exports.getDeviation = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids) return res.status(400).json({ error: 'Cryptocurrency ID is required' });

        const prices = await Price.find({ currency: ids }).sort({ timestamp: -1 }).limit(100);
        if (prices.length === 0) return res.status(404).json({ error: 'No price data found' });

        const priceValues = prices.map(p => parseFloat(p.price.toString()));
        const mean = priceValues.reduce((sum, value) => sum + value, 0) / priceValues.length;
        const variance = priceValues.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / priceValues.length;
        const standardDeviation = Math.sqrt(variance);

        res.status(200).json({ standardDeviation });
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate deviation', details: error.message });
    }
};