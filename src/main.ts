export function getCryptoVison() {
    return {
        rates: {
            BTCUSD: 62659.6,
            USDEUR: 0.86,
        },
        accounts: {
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
        },
    }
}
