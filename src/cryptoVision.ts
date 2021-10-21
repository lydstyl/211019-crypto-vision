import { getBTCUSD, getEURUSD } from './rates/index'
import { getExternalAccounts } from './googleSheets/dataFromSheets'

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

    const externalAccounts = await getExternalAccounts()

    return {
        rates: {
            BTCUSD,
            EURUSD,
        },
        accounts: {
            ...externalAccounts,

            // TODO split externalAccounts to ...autoAccounts & ...manualAccounts

            // bitstamp: {
            //     BTC: {
            //         price: 1,
            //         amount: 0.2,
            //     },
            //     XRP: {
            //         price: 1,
            //         amount: 0.2,
            //     },
            // },
            // binance: {
            //     XRP: {
            //         price: 1,
            //         amount: 0.2,
            //     },
            //     DAI: {
            //         price: 1,
            //         amount: 0.2,
            //     },
            // },
            // poloniex: {
            //     XRP: {
            //         price: 1,
            //         amount: 0.2,
            //     },
            //     DAI: {
            //         price: 1,
            //         amount: 0.2,
            //     },
            // },
            // bittrex: {
            //     XRP: {
            //         price: 1,
            //         amount: 0.2,
            //     },
            //     DAI: {
            //         price: 1,
            //         amount: 0.2,
            //     },
            // },
        },
    }
}
