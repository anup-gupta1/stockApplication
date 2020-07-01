const mongoose = require('mongoose');
const fetch = require('node-fetch');
const mongoURI = "mongodb://anup:anup123gupta@ds013024.mlab.com:13024/mernapp";
const Stock = require("../models/Stock");

const insertStockData = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("MongoDb Successfully connected")
            fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=FYHWG474WJSJJMLG')
                .then(res => res.json())
                .then(body => {
                    const metaData = body["Meta Data"];
                    const info = metaData["1. Information"];
                    const symbol = metaData["2. Symbol"];
                    const lastRefreshed = metaData["3. Last Refreshed"];
                    const outputSize = metaData["4. Output Size"];
                    const tz = metaData["5. Time Zone"];
                    const timeSeries = body["Time Series (Daily)"];
                    const name = "Apple";
                    const open = Number(timeSeries["2020-06-30"]["4. close"]);
                    const current = Number(timeSeries["2020-06-30"]["4. close"]);
                    let data = {}
                    let count = 0
                    for (let i in timeSeries) {
                        data[i] = {}
                        data[i]["open"] = timeSeries[i]["1. open"]
                        data[i]["high"] = timeSeries[i]["2. high"]
                        data[i]["low"] = timeSeries[i]["3. low"]
                        data[i]["close"] = timeSeries[i]["4. close"]
                        data[i]["volume"] = timeSeries[i]["5. volume"]

                    }
                    console.log("----- 1st data ------", timeSeries["2020-06-30"]["4. close"])
                    new Stock({ info, symbol, lastRefreshed, outputSize, tz, timeSeries: data, name, open, current }).save()
                        .then(doc => console.log(doc)).catch(err => console.log(err))

                }).catch(err => console.log("fetch err", err))
        })
        .catch(err => console.log(err));
}

insertStockData();
