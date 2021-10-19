import { fetchTicker } from './ticker'

describe('fetchTicker function', () => {
    it('return an object with a fetchTicker property', async () => {
        const result = await fetchTicker('bitstamp', 'EUR/USD')

        expect(result).toHaveProperty('symbol')
        expect(result).toHaveProperty('info')
        expect(result.info).toHaveProperty('bid')
    })
})
