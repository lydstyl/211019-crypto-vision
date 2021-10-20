import { getBTCUSD, getEURUSD, getExchange } from './index'

// import Ticker, { hello } from './ticker'
import Ticker from './ticker'

const symbols = {
    btcUsd: 'BTC/USD',
    eurUsd: 'EUR/USD',
}

const mockedBid = {
    'BTC/USD': '66000.02',
    'EUR/USD': '1.121',
}

jest.mock('./ticker', () => {
    const originalTickerModule = jest.requireActual('./ticker')

    return {
        __esModule: true,
        ...originalTickerModule,
        default: {
            fetchTicker: jest.fn((_exchangeId: string, symbols: string) => {
                return Promise.resolve({
                    symbol: symbols,
                    info: {
                        bid: mockedBid[symbols],
                    },
                })
            }),
        },
        //hello: 'mocked hello (export const hello = "world"',
    }
})

describe('getBTCUSD function', () => {
    it('should do a partial mock', async () => {
        const defaultExportResult = await Ticker.fetchTicker(
            'bitstamp',
            symbols.btcUsd,
        )

        expect(defaultExportResult.info.bid).toBe(mockedBid[symbols.btcUsd])

        expect(Ticker.fetchTicker).toHaveBeenCalled()
    })

    it('BTC/USD bid is mocked bid for exemple 66000.02', async () => {
        const result = await getBTCUSD()

        expect(typeof result).toBe('number')
        expect(result == parseFloat(mockedBid[symbols.btcUsd])).toBeTruthy()
    })
})

describe('getEURUSD function', () => {
    it('should do a partial mock', async () => {
        const defaultExportResult = await Ticker.fetchTicker(
            'bitstamp',
            symbols.eurUsd,
        )

        expect(defaultExportResult.info.bid).toBe(mockedBid[symbols.eurUsd])

        expect(Ticker.fetchTicker).toHaveBeenCalled()
    })

    it('EUR/USD bid is more than 0.5 and less than 2', async () => {
        const result = await getEURUSD()

        expect(result).toBeGreaterThan(0.5)
        expect(result).toBeLessThan(2)
        expect(typeof result).toBe('number')
        expect(result == parseFloat(mockedBid[symbols.eurUsd])).toBeTruthy()
    })
})

describe('getExchange function', () => {
    it('return an object with a fetchTicker property', () => {
        const result = getExchange('bitstamp')

        expect(result).toHaveProperty('fetchTicker')
    })
})
