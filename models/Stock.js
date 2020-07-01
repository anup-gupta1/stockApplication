const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    name: { type: String, required: true },
    region: { type: String, required: true, default: "United States" },
    type: { type: String, required: true, default: "Equity" },
    currency: { type: String, required: true, default: "USD" },
    info: { type: String, required: true },
    symbol: { type: String, required: true },
    lastRefreshed: { type: String, required: true },
    outputSize: { type: String, required: true },
    tz: { type: String, required: true },
    timeSeries: { type: Object, required: true },
    open: { type: Number, required: true },
    current: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = Stock = mongoose.model('stocks', StockSchema);