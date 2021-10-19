'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ccxt = require('ccxt')

interface EURUSD {
    EURUSD: number
}
export function getEURUSD(): EURUSD {
    return {
        EURUSD: 1.16472,
    }
}

interface Exchange {
    fetchTicker: (symbols: string) => Ticker
}
interface Ticker {
    symbol: string
}

export function getExchange(exchangeId: string): Exchange {
    const exchangeClass = ccxt[exchangeId]
    return new exchangeClass({
        apiKey: process.env.BITSTAMP_KEY,
        secret: process.env.BITSTAMP_SECRET,
        uid: process.env.BITSTAMP_UID,
    })
}

export async function fetchTicker(
    exchangeId: string,
    symbols: string,
): Promise<Ticker> {
    const exchange = getExchange(exchangeId)

    return exchange.fetchTicker(symbols)
}

;(async function () {
    const ticker = await fetchTicker('bitstamp', 'EUR/USD')

    // const exchangeId = 'bitstamp',
    //     exchangeClass = ccxt[exchangeId],
    //     exchange = new exchangeClass({
    //         apiKey: process.env.BITSTAMP_KEY,
    //         secret: process.env.BITSTAMP_SECRET,
    //         uid: process.env.BITSTAMP_UID,
    //     })
    // const exchange = getExchange('bitstamp')
    // console.log(await exchange.fetchTicker('EUR/USD')) ////////////
    // {
    //     symbol: 'EUR/USD',
    //     timestamp: 1634664876000,
    //     datetime: '2021-10-19T17:34:36.000Z',
    //     high: 1.16819,
    //     low: 1.1612,
    //     bid: 1.16527,
    //     bidVolume: undefined,
    //     ask: 1.16541,
    //     askVolume: undefined,
    //     vwap: 1.16682,
    //     open: 1.16161,
    //     close: 1.16521,
    //     last: 1.16521,
    //     previousClose: undefined,
    //     change: undefined,
    //     percentage: undefined,
    //     average: undefined,
    //     baseVolume: 2210868.63229,
    //     quoteVolume: 2579685.737528618,
    //     info: {
    //       high: '1.16819',
    //       last: '1.16521',
    //       timestamp: '1634664876',
    //       bid: '1.16527',
    //       vwap: '1.16682',
    //       volume: '2210868.63229',
    //       low: '1.16120',
    //       ask: '1.16541',
    //       open: '1.16161'
    //     }
    //   }
})()
