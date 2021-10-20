'use strict'

import { getExchange } from './index'

export interface TickerType {
    symbol: string
    info: {
        bid: string
    }
}

const fetchTicker = async function (
    // TODO MOCK THIS
    exchangeId: string,
    symbols: string,
): Promise<TickerType> {
    const exchange = getExchange(exchangeId)

    return exchange.fetchTicker(symbols)
}

// export const hello = 'world' // this was for mock test

export default { fetchTicker }
