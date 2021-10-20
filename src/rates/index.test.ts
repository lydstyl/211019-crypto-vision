import { getEURUSD, getExchange } from './index'

// import Ticker, { hello } from './ticker'
import Ticker from './ticker'

const mockedBid = '1.121'

jest.mock('./ticker', () => {
    const originalTickerModule = jest.requireActual('./ticker')

    return {
        __esModule: true,
        ...originalTickerModule,
        default: {
            fetchTicker: jest.fn((_exchangeId: string, symbols: string) =>
                Promise.resolve({
                    symbol: symbols,
                    info: {
                        bid: mockedBid,
                    },
                }),
            ),
        },
        //hello: 'mocked hello (export const hello = "world"',
    }
})

describe('getEURUSD function', () => {
    it('should do a partial mock', async () => {
        const defaultExportResult = await Ticker.fetchTicker(
            'bitstamp',
            'EUR/USD',
        )

        expect(defaultExportResult.info.bid).toBe(mockedBid)

        expect(Ticker.fetchTicker).toHaveBeenCalled()
    })

    it('EUR/USD bid is more than 0.5 and less than 2', async () => {
        const result = await getEURUSD()

        expect(result).toBeGreaterThan(0.5)
        expect(result).toBeLessThan(2)
        expect(typeof result).toBe('number')
        expect(result == parseFloat(mockedBid)).toBeTruthy()
    })

    describe('getExchange function', () => {
        it('return an object with a fetchTicker property', () => {
            const result = getExchange('bitstamp')

            expect(result).toHaveProperty('fetchTicker')
        })
    })
})
