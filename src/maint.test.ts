import { getCryptoVison } from './main'

describe('getCryptoVision function', () => {
    it('return an object with a rates property', async () => {
        const result = await getCryptoVison()

        expect(result).toHaveProperty('rates')
    })

    it('return an object with a accounts property', async () => {
        const result = await getCryptoVison()

        expect(result).toHaveProperty('accounts')
    })
})
