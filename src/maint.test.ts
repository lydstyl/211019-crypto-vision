import { getCryptoVison } from './main'

describe('getCryptoVision function', () => {
  it('return an object with a rates property', () => {
    const result = getCryptoVison()

    expect(result).toHaveProperty('rates')
  })

  it('return an object with a accounts property', () => {
    const result = getCryptoVison()

    expect(result).toHaveProperty('accounts')
  })
})
