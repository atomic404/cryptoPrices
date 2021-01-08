const axios = require('axios'); require('colors');
const { change } = require('./title'); change('[CryptoPrices] by Atomic#1337');
const { yourCryptos, yourPrice, startPrice, flickerTimeMs } = require('./configuration.json');

let allowedCryptos = ["BTC", "BCH", "ETH", "LTC", "ALGO"];

let updatedPrice = {};

function getPrice(sign) {
    axios.post('https://countervalues.live.ledger.com/latest', [{ from: sign, to: "USD" }])
        .then(res => {
            updatedPrice[sign] = res.data[0];
        });
}

function getResponse(func, options = {}) {
    if (func === "myBalance") {
        let A = updatedPrice[options.walletType], B = options.wallet[options.walletType], C = startPrice[options.walletType];
        let bal = (B * A);
        let percentage = (((A - C) * 100) / A).toFixed(2);
        percentage = percentage.toString();
        let percent = percentage.startsWith("-") ? `(${percentage})%`.brightRed : `(${percentage})%`.brightGreen
        return {
            bal: bal.toFixed(2),
            percent: percent,
            type: options.walletType
        };
    }
}

function app(myCryptos = []) {
    myCryptos.forEach((crypto) => {
        if (!allowedCryptos.includes(crypto)) {
            console.log(`You're trying to use a not approved crypto. (${crypto})`)
            return process.exit(1);
        }
        getPrice(crypto)
    })

    setInterval(() => {
        myCryptos.forEach((crypto) => {
            getPrice(crypto)
        })

        console.clear();

        if (myCryptos.includes("BTC")) {
            let json = getResponse("myBalance", {
                wallet: {
                    BTC: yourPrice.BTC
                },
                walletType: "BTC"
            })
            console.log(`[${json.type}] `.brightBlue + `Market Price: `.brightWhite + `$${Math.round(updatedPrice[json.type])} `.cyan + json.percent)
            console.log(`[${json.type}] `.brightBlue + `Your wallet: `.brightWhite + `$${json.bal} `.yellow + '\n')
        }
        if (myCryptos.includes("BCH")) {
            let json = getResponse("myBalance", {
                wallet: {
                    BCH: yourPrice.BCH
                },
                walletType: "BCH"
            })
            console.log(`[${json.type}] `.brightBlue + `Market Price: `.brightWhite + `$${updatedPrice[json.type]} `.cyan + json.percent)
            console.log(`[${json.type}] `.brightBlue + `Your wallet: `.brightWhite + `$${json.bal} `.yellow + '\n')
        }
        if (myCryptos.includes("ETH")) {
            let json = getResponse("myBalance", {
                wallet: {
                    ETH: yourPrice.ETH
                },
                walletType: "ETH"
            })
            console.log(`[${json.type}] `.brightBlue + `Market Price: `.brightWhite + `$${Math.round(updatedPrice[json.type])} `.cyan + json.percent)
            console.log(`[${json.type}] `.brightBlue + `Your wallet: `.brightWhite + `$${json.bal} `.yellow + '\n')
        }
        if (myCryptos.includes("LTC")) {
            let json = getResponse("myBalance", {
                wallet: {
                    LTC: yourPrice.LTC
                },
                walletType: "LTC"
            })
            console.log(`[${json.type}] `.brightBlue + `Market Price: `.brightWhite + `$${updatedPrice[json.type]} `.cyan + json.percent)
            console.log(`[${json.type}] `.brightBlue + `Your wallet: `.brightWhite + `$${json.bal} `.yellow + '\n')
        }
        if (myCryptos.includes("ALGO")) {
            let json = getResponse("myBalance", {
                wallet: {
                    ALGO: yourPrice.ALGO
                },
                walletType: "ALGO"
            })
            console.log(`[${json.type}] `.brightBlue + `Market Price: `.brightWhite + `$${updatedPrice[json.type]} `.cyan + json.percent)
            console.log(`[${json.type}] `.brightBlue + `Your wallet: `.brightWhite + `$${json.bal} `.yellow + '\n')
        }
    }, flickerTimeMs);
}

app(yourCryptos)
