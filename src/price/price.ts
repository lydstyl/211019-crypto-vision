import axios from 'axios'
import { Accounts } from '../cryptoVision'

export const addPrices = async (
    allAccountsWithoutPrice: Accounts,
): Promise<Accounts> => {
    const prices = await fetchUsdPrices()

    Object.keys(allAccountsWithoutPrice).forEach((accountName) => {
        Object.keys(allAccountsWithoutPrice[accountName]).forEach(
            (cryptoSymbol) => {
                if (prices[cryptoSymbol] !== undefined) {
                    if (cryptoSymbol === 'USD') {
                        allAccountsWithoutPrice[accountName][
                            cryptoSymbol
                        ].price = prices['DAI']
                    } else {
                        allAccountsWithoutPrice[accountName][
                            cryptoSymbol
                        ].price = prices[cryptoSymbol]
                    }
                }
            },
        )
    })

    return allAccountsWithoutPrice
}

interface Crypto {
    symbol: string
    priceUsd: string
}

interface Response {
    data: {
        data: Crypto[]
    }
}

interface CryptoPrices {
    [cryptoSymbol: string]: number
}

export const fetchUsdPrices = async (): Promise<CryptoPrices> => {
    try {
        const response = await axios.get(
            'http://api.coincap.io/v2/assets?limit=100',
        )

        const response2 = response as Response

        const usdPrices = {}

        response2.data.data.forEach((c) => {
            usdPrices[c.symbol] = parseFloat(c.priceUsd)
        })

        return usdPrices
    } catch (error) {
        console.log(
            'ERROR WHEN FETCHING USD PRICES FROM http://api.coincap.io/v2/assets?limit=100',
        )

        console.log(`gb🚀 ~ fetchUsdPrices ~ error`, error)

        return error
    }
}
