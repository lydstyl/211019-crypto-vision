import { getCryptoVison } from './cryptoVision'

// import { getBTCUSD, getEURUSD } from './rates/index'
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

const mockedAccount1 = {
    account1: {
        crypto1: { price: 1.1, amount: 2.2 },
        crypto2: { price: 2.1, amount: 3.2 },
    },
}

const mockedAccount2 = {
    account2: {
        crypto1: { price: 1.1, amount: 2.2 },
        crypto2: { price: 2.1, amount: 3.2 },
    },
}

const mockedAccount3 = {
    account3: {
        crypto1: { price: 1.1, amount: 2.2 },
        crypto2: { price: 2.1, amount: 3.2 },
    },
}

const mockedAccount4 = {
    account4: {
        crypto1: { price: 1.1, amount: 2.2 },
        crypto2: { price: 2.1, amount: 3.2 },
    },
}

const mockedAllAccountsWithPrice = {
    ...mockedAccount1,
    ...mockedAccount2,
    ...mockedAccount3,
    ...mockedAccount4,
}

// import { getAccounts } from './googleSheets/dataFromSheets'
jest.mock('./googleSheets/dataFromSheets', () => {
    const originalModul = jest.requireActual('./googleSheets/dataFromSheets')

    const mockedGetAccounts = jest.fn(() => {
        const manualAccounts = new Promise((resolve) => {
            resolve({
                ...mockedAccount1,
                ...mockedAccount2,
            })
        })

        return manualAccounts
    })

    return {
        __esModule: true,
        ...originalModul,
        getAccounts: mockedGetAccounts,
    }
})

// import { getAllAutoAccounts } from './autoAccounts/autoAccounts'
jest.mock('./autoAccounts/autoAccounts', () => {
    const originalModul = jest.requireActual('./autoAccounts/autoAccounts')

    const mockedGetAllAutoAccounts = jest.fn(() => {
        const autoAccounts = new Promise((resolve) => {
            resolve({
                ...mockedAccount3,
                ...mockedAccount4,
            })
        })

        return autoAccounts
    })

    return {
        __esModule: true,
        ...originalModul,
        getAllAutoAccounts: mockedGetAllAutoAccounts,
    }
})

// import { addPrices } from './price/price'
jest.mock('./price/price', () => {
    const originalModul = jest.requireActual('./price/price')

    const mockedAddPrices = jest.fn(() => {
        const allAccountsWithoutPrice = new Promise((resolve) => {
            resolve({
                ...mockedAccount1,
                ...mockedAccount2,
                ...mockedAccount3,
                ...mockedAccount4,
            })
        })

        return allAccountsWithoutPrice
    })

    return {
        __esModule: true,
        ...originalModul,
        addPrices: mockedAddPrices,
    }
})

describe('getCryptoVision function', () => {
    it('return an object with a rates property', async () => {
        const result = await getCryptoVison()

        expect(result).toHaveProperty('rates')
    })

    it('return an object with a mocked EURUSD', async () => {
        const result = await getCryptoVison()

        expect(result.rates.EURUSD).toBe(mockedEURUSD)
    })

    it('return an object with a mocked BTCUSD', async () => {
        const result = await getCryptoVison()

        expect(result.rates.BTCUSD).toBe(mockedBTCUSD)
    })

    it('return an object with a accounts property', async () => {
        const result = await getCryptoVison()

        expect(result).toHaveProperty('accounts')
    })

    it('return an object with accounts', async () => {
        const result = await getCryptoVison()

        expect(result.accounts).toEqual(mockedAllAccountsWithPrice)
    })
})
