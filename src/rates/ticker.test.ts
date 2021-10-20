import Rates from './index'

import Ticker from './ticker'

jest.mock('./index')
const mockedRates = Rates as jest.Mocked<typeof Rates>

test('should get exchange', () => {
    const exchange = {
        fetchTicker: () => {
            return {
                symbol: 'mySymbol',
                info: {
                    bid: '42.24',
                },
            }
        },
    }
    mockedRates.getExchange.mockReturnValue(exchange)

    const result = Ticker.fetchTicker('bitstamp', 'xxx')

    expect(result).toEqual(Promise.resolve(exchange))
})
