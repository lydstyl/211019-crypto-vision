// import axios from 'axios'
import { fetchUsdPrices } from './price'

// interface AxiosResp {
//     data: { data: { symbol: string; name: string; priceUsd: string }[] }
// }

// const mockedAxiosResponse = {
//     data: {
//         data: [
//             {
//                 symbol: 'BTC',
//                 name: 'Bitcoin',
//                 priceUsd: '62056.1888603955951706',
//             },
//             {
//                 symbol: 'ETH',
//                 name: 'Ethereum',
//                 priceUsd: '4255.3121784225873283',
//             },
//         ],
//     },
// }

// const expectedResult = {
//     BTC: 62056.1888603955951706,
//     ETH: 4255.3121784225873283,
// }

// jest.mock('axios')

// const get = axios.get as unknown as () => AxiosResp

describe('fetchUsdPrices function', () => {
    it('return an object with BTC and ETH as properties and prices as value', async () => {
        // axios.get.mockImplementation(() => Promise.resolve(mockedAxiosResponse))
        // get.mockResolvedValue(mockedAxiosResponse)
        const result = await fetchUsdPrices()

        expect(result).toHaveProperty('BTC')
        expect(result).toHaveProperty('ETH')
        expect(result.BTC).toBeGreaterThan(6000)
        expect(result.ETH).toBeGreaterThan(400)
    })
})
