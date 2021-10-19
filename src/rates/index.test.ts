import { getEURUSD, getExchange } from './index'

describe('getEURUSD function', () => {
    it('return EUR/USD bid', async () => {
        const result = await getEURUSD()

        expect(result).toHaveProperty('EURUSD')
    })

    it('EUR/USD bid is more than 0.5 and less than 2', async () => {
        const result = await getEURUSD()

        expect(result.EURUSD).toBeGreaterThan(0.5)
        expect(result.EURUSD).toBeLessThan(2)
    })
})

describe('getExchange function', () => {
    it('return an object with a fetchTicker property', () => {
        const result = getExchange('bitstamp')

        expect(result).toHaveProperty('fetchTicker')
    })
})
