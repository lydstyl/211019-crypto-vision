'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ccxt = require('ccxt')

import { Ticker, fetchTicker } from './ticker'

interface Exchange {
    fetchTicker: (symbols: string) => Ticker
}

export async function getEURUSD(): Promise<number> {
    const ticker = await fetchTicker('bitstamp', 'EUR/USD')

    const bid: string = ticker.info.bid

    const bidNumber: number = parseFloat(bid)

    return bidNumber
}

export function getExchange(exchangeId: string): Exchange {
    const exchangeClass = ccxt[exchangeId]
    return new exchangeClass({
        apiKey: process.env.BITSTAMP_KEY,
        secret: process.env.BITSTAMP_SECRET,
        uid: process.env.BITSTAMP_UID,
    })
}
