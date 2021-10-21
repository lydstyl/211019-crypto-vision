import { getCryptoVison } from './cryptoVision'

const mockedEURUSD = 1.123
const mockedBTCUSD = 65000.02

jest.mock('./rates/index', () => {
    const originalModul = jest.requireActual('./rates/index')

    const mockedGetBTCUSD = jest.fn(() => mockedBTCUSD)
    const mockedGetEURUSD = jest.fn(() => mockedEURUSD)

    return {
        __esModule: true,
        ...originalModul,
        getBTCUSD: mockedGetBTCUSD,
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
