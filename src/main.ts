import { getCryptoVison } from './cryptoVision'
//export { getCryptoVison } from './cryptoVision'
;(async function () {
    const cryptoVision = await getCryptoVison()

    console.log(`gb🚀 ~ cryptoVision`, cryptoVision)
})()
