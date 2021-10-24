import { getBTCUSD, getEURUSD } from './rates/index'
import { getAccounts } from './googleSheets/dataFromSheets'
import { getAllAutoAccounts } from './autoAccounts/autoAccounts'

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
    console.log(`gb🚀 ~ getCryptoVison ~ manualAccounts`, manualAccounts)
    const autoAccounts = await getAllAutoAccounts()
    // console.log(`gb🚀 ~ getCryptoVison ~ autoAccounts`, autoAccounts)

    return {
        rates: {
            BTCUSD,
            EURUSD,
        },
        accounts: {
            ...manualAccounts,
            ...autoAccounts,
        },
    }
}
