import { getCryptoVison } from './cryptoVision'
import SpreadSheet from './googleSheets/dataFromSheets'
;(async function () {
    console.log('GET CRYPTO VISION')

    const cryptoVision = await getCryptoVison()
    // const cryptoVision = {
    //     rates: { BTCUSD: 60577.19, EURUSD: 1.16252 },
    //     accounts: {
    //         LEDGER_BLACK: {
    //             BTC: { price: 60547.984926455676, amount: '0,1' },
    //             USD: { price: undefined, amount: '2' },
    //             DAI: { price: 1.0018216595860643, amount: '15000' },
    //         },
    //         LEDGER_TRANSPARENT: {
    //             BTC: { price: 60547.984926455676, amount: '0,2' },
    //             USD: { price: undefined, amount: '3' },
    //             DAI: { price: 1.0018216595860643, amount: '10000' },
    //         },
    //     },
    // }

    console.log('WRITE TO CALC')
    const patrimoine = new SpreadSheet(process.env.GOOGLE_DOC_ID, 84)
    await patrimoine.writeToCalc(cryptoVision)

    console.log(
        'DONE :',
        'https://docs.google.com/spreadsheets/d/1rrYVxvKNLXrD-eiQLOD4hc0Clpp4xPAINc5d70VOv5c/edit#gid=1902839393',
    )
})()
