"use strict";

/*
This example show how to retrieve tickers from CoinMarketCap
*/
const _ = require('lodash');
const Helpers = require('../../lib/helpers');
const Client = require('../../../lib/client');

// this is the default
const baseUri = 'http://127.0.0.1:8000';
const restClient = new Client.RestClient({baseUri:baseUri});

// retrieve top 3 entries
let opt = {limit:3}

// first ensure gateway is running
restClient.ping().then((running) => {
    if (!running)
    {
        console.log(`Gateway is not running on '${baseUri}'`);
        process.exit(1);
    }
    // retrieve services to ensure exchanges are supported
    return restClient.getServices().then((services) => {
        // ensure service is supported
        if (!restClient.checkService(services, 'coinmarketcap'))
        {
            console.log(`CoinMarketCap service is not enabled on gateway`);
            process.exit(1);
        }
        return restClient.getCoinMarketCapTickers({limit:opt.limit}).then((data) => {
            console.log(`Top '${opt.limit}' entries on CoinMarketCap :`);
            console.log(Helpers.stringify(data, null, 4) + "\n");
        });
    });
}).catch((err) => {
    if (restClient.isBaseError(err))
    {
        console.log(Helpers.stringify(err));
    }
    else
    {
        console.log(err);
    }
});
