import { getBTCUSD, getEURUSD } from './rates/index'

interface Crypto {
    price: number
    amount: number
}

export interface Account {
    [cryptoSymbol: string]: Crypto
}

interface CryptoVision {
    rates: {
        BTCUSD: number
        EURUSD: number
    }
    accounts: {
        ledgerBlack: Account
        ledgerTransparent: Account
        bitstamp: Account
        binance: Account
        poloniex: Account
        bittrex: Account
    }
}

export async function getCryptoVison(): Promise<CryptoVision> {
    const BTCUSD = await getBTCUSD()
    const EURUSD = await getEURUSD()

    return {
        rates: {
            BTCUSD,
            EURUSD,
        },
        accounts: {
            // todo
            ledgerBlack: {
                BTC: {
                    price: 1,
                    amount: 0.3,
                },
                DAI: {
                    price: 0.1,
                    amount: 8000,
                },
            },
            ledgerTransparent: {
                BTC: {
                    price: 1,
                    amount: 0.2,
                },
            },
            bitstamp: {
                BTC: {
                    price: 1,
                    amount: 0.2,
                },
                XRP: {
                    price: 1,
                    amount: 0.2,
                },
            },
            binance: {
                XRP: {
                    price: 1,
                    amount: 0.2,
                },
                DAI: {
                    price: 1,
                    amount: 0.2,
                },
            },
            poloniex: {
                XRP: {
                    price: 1,
                    amount: 0.2,
                },
                DAI: {
                    price: 1,
                    amount: 0.2,
                },
            },
            bittrex: {
                XRP: {
                    price: 1,
                    amount: 0.2,
                },
                DAI: {
                    price: 1,
                    amount: 0.2,
                },
            },
        },
    }
}
