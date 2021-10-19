'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ccxt = require('ccxt')

import { Ticker, fetchTicker } from './ticker'

interface EURUSD {
    EURUSD: number
}
interface Exchange {
    fetchTicker: (symbols: string) => Ticker
}

export async function getEURUSD(): Promise<EURUSD> {
    const ticker = await fetchTicker('bitstamp', 'EUR/USD')

    const bid = ticker.info.bid

    const bidNumber = parseFloat(bid)

    return {
        EURUSD: bidNumber,
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

// ;(async function () {
//     const ticker = await fetchTicker('bitstamp', 'EUR/USD')
//     console.log(`gb🚀 ~ bid`, ticker.info)
// })()
