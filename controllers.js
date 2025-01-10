const axios = require('axios');
require('dotenv').config();

exports.fetchStats = async (ids) => {
    const options = {
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=false`,
        headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.COINGECKO_API }
    };
    const response = await axios.request(options);
    return response.data;
};