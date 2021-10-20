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

describe('fetchTicker function', () => {
    it('return an object with a fetchTicker property', async () => {
        const result = await Ticker.fetchTicker('bitstamp', 'EUR/USD')

        expect(result).toHaveProperty('symbol')
        expect(result).toHaveProperty('info')
        expect(result.info).toHaveProperty('bid')
        expect(result.info.bid).toBe(mockedBid)
    })
})
