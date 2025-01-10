const express = require('express');
const router = express.Router();
const statsController = require('./controllers');

router.post('/api/stats', async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids) return res.status(400).json({ error: 'Cryptocurrency ID is required' });
        const data = await statsController.fetchStats(ids);
        if (data && data[ids]) {
            res.status(200).json(
                { 
                    price: data[ids].usd ,
                    marketCap:data[ids].usd_market_cap,
                    "24hChange":data[ids].usd_24h_change
                }
            );
        } else {
            res.status(404).json({ error: 'Invalid cryptocurrency ID' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats', details: error.message });
    }
});

router.post('/api/deviation', statsController.getDeviation);

module.exports = router;