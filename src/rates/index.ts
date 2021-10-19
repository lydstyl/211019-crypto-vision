'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ccxt = require('ccxt')

interface EURUSD {
    EURUSD: number
}
export async function getEURUSD(): Promise<EURUSD> {
    const ticker = await fetchTicker('bitstamp', 'EUR/USD')

    const bid = ticker.info.bid

    const bidNumber = parseFloat(bid)

    return {
        EURUSD: bidNumber,
    }
}

interface Exchange {
    fetchTicker: (symbols: string) => Ticker
}
interface Ticker {
    symbol: string
    info: {
        bid: string
    }
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

// ;(async function () {
//     const ticker = await fetchTicker('bitstamp', 'EUR/USD')
//     console.log(`gb🚀 ~ bid`, ticker.info)
// })()
