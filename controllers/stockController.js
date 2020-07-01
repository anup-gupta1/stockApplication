const CronJob = require('cron').CronJob;
const Stock = require("../models/Stock");
const app = require('../server')


/*
api to get companies stock
res
*/

const getCompaniesStock = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.status(200).json({ success: true, stocks });
    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}

exports.getCompaniesStock = getCompaniesStock;


/*
method to update share value wrt time
*/
const updateShare = async () => {
    try {
        const { userSockets } = app;
        const companies = ['IBM', 'BK', 'AAPL', 'MSFT', 'GE'];
        const index = Math.floor(Math.random() * 5);
        const symbol = companies[index];
        console.log("companiy index", index, symbol);
        const changeIndex = Math.floor(Math.random() * 6);
        const change = [0.05, 0.12, -0.08, 0.15, -0.009, -0.29];
        const val = Number(change[changeIndex]);
        const updatedStock = await Stock.findOneAndUpdate({ symbol }, { $inc: { current: val } }, { new: true }).exec();
        for (let i in userSockets) {
            for (let socket of userSockets[i]) {
                socket.emit('update-stock', { updatedStock, change: val });
            }
        }
    } catch (err) {
        console.error(err);
    }
}

const updateShareJob = new CronJob('05 * * * * *', updateShare, null, true, 'Asia/Kolkata');
updateShareJob.start();