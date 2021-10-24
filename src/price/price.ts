import axios from 'axios'

export const addPrices = async (allAccountsWithoutPrice) => {
    const prices = await fetchUsdPrices()

    Object.keys(allAccountsWithoutPrice).forEach((accountName) => {
        Object.keys(allAccountsWithoutPrice[accountName]).forEach(
            (cryptoSymbol) => {
                // if (cryptoSymbol === 'USD') {

                // }

                if (prices[cryptoSymbol] !== undefined) {
                    allAccountsWithoutPrice[accountName][cryptoSymbol].price =
                        prices[cryptoSymbol]
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
        const response = await axios(
            'http://api.coincap.io/v2/assets?limit=100',
        )

        const response2 = response as Response

        const usdPrices = {}

        response2.data.data.forEach((c) => {
            usdPrices[c.symbol] = parseFloat(c.priceUsd)
        })

        return usdPrices
    } catch (error) {
        console.log(`gb🚀 ~ fetchUsdPrices ~ error`, error)
        return error
    }
}
