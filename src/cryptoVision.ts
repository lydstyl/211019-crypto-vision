import { getBTCUSD, getEURUSD } from './rates/index'
import { getAccounts } from './googleSheets/dataFromSheets'
import { getAllAutoAccounts } from './autoAccounts/autoAccounts'
import { addPrices } from './price/price'

interface Crypto {
    price: number
    amount: number
}

export interface Account {
    [cryptoSymbol: string]: Crypto
}

export interface Accounts {
    [name: string]: Account
}

interface CryptoVision {
    rates: {
        BTCUSD: number
        EURUSD: number
    }
    accounts: Accounts
}

export async function getCryptoVison(): Promise<CryptoVision> {
    const BTCUSD = await getBTCUSD()
    const EURUSD = await getEURUSD()

    const manualAccounts = await getAccounts('manual')
    const autoAccounts = await getAllAutoAccounts()

    const allAccountsWithoutPrice = {
        ...manualAccounts,
        ...autoAccounts,
    }

    // const allAccountsWithPrice = allAccountsWithoutPrice
    const allAccountsWithPrice = await addPrices(allAccountsWithoutPrice)

    return {
        rates: {
            BTCUSD,
            EURUSD,
        },
        accounts: {
            ...allAccountsWithPrice,
        },
    }
}
