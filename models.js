const mongoose = require('mongoose')


const priceSchema = new mongoose.Schema({
    currency: { type: String, required: true },
    price: { type: mongoose.Types.Decimal128, required: true },
    timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Price', priceSchema);