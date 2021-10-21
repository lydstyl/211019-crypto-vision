// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { GoogleSpreadsheet } from 'google-spreadsheet'

const spreadSheet = {
    getData: async () => {
        // Initialize the sheet - doc ID is the long id in the sheets URL
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_DOC_ID)

        try {
            // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
            await doc.useServiceAccountAuth({
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY,
            })
        } catch (error) {
            console.log('ERROR WHILE INITIALIZING')
            console.log(error)
        }

        try {
            await doc.loadInfo() // loads document properties and worksheets
        } catch (error) {
            console.log('ERROR WHILE LOADING DOC INFOS')
            console.log(error)
        }
        const sheet = doc.sheetsByIndex[4] // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

        let rows

        try {
            // read rows
            rows = await sheet.getRows({ limit: 6, offset: 1 }) // can pass in { limit, offset }
        } catch (error) {
            console.log('ERROR WHILE GETTING SHEET ROWS')
            console.log(error)
        }

        const cryptos = rows.map((r) => r._rawData[0]).filter((c) => c !== '')

        return cryptos
    },
}

;(async function () {
    const response = await spreadSheet.getData()
    console.log(`gb🚀 ~ response`, response)
})()

export default spreadSheet
