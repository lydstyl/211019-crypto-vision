import { getCryptoVison } from './main'

const mockedEURUSD = 1.123

jest.mock('./rates/index', () => {
    const originalModul = jest.requireActual('./rates/index')

    const mockedGetEURUSD = jest.fn(() => mockedEURUSD)

    return {
        __esModule: true,
        ...originalModul,
        getEURUSD: mockedGetEURUSD,
    }
})

describe('getCryptoVision function', () => {
    it('return an object with a rates property', async () => {
        const result = await getCryptoVison()

        expect(result).toHaveProperty('rates')
    })

    it('return an object with a accounts property', async () => {
        const result = await getCryptoVison()

        expect(result).toHaveProperty('accounts')
    })

    it('return an object with a mocked EURUSD', async () => {
        const result = await getCryptoVison()

        expect(result.rates.EURUSD).toBe(mockedEURUSD)
    })
})
