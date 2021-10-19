'use strict'

import { getExchange } from './index'

export interface Ticker {
    symbol: string
    info: {
        bid: string
    }
}

export async function fetchTicker( // TODO MOCK THIS
    exchangeId: string,
    symbols: string,
): Promise<Ticker> {
    const exchange = getExchange(exchangeId)

    return exchange.fetchTicker(symbols)
}
