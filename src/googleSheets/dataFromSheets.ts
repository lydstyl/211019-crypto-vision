// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { GoogleSpreadsheet } from 'google-spreadsheet'

const getData = async () => {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(
        '1rrYVxvKNLXrD-eiQLOD4hc0Clpp4xPAINc5d70VOv5c',
    )

    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    })

    await doc.loadInfo() // loads document properties and worksheets

    const sheet = doc.sheetsByIndex[4] // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

    // read rows
    const rows = await sheet.getRows({ limit: 6, offset: 1 }) // can pass in { limit, offset }

    const cryptos = rows.map((r) => r._rawData[0]).filter((c) => c !== '')

    return cryptos
}

// const getData = async () => {
//     // Initialize the sheet - doc ID is the long id in the sheets URL
//     const doc = new GoogleSpreadsheet(
//         '1rrYVxvKNLXrD-eiQLOD4hc0Clpp4xPAINc5d70VOv5c',
//     )

//     // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
//     await doc.useServiceAccountAuth({
//         client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//         private_key: process.env.GOOGLE_PRIVATE_KEY,
//     })

//     await doc.loadInfo() // loads document properties and worksheets
//     // console.log(doc.title)

//     //   await doc.updateProperties({ title: 'renamed doc' })

//     const sheet = doc.sheetsByIndex[4] // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
//     // console.log(sheet.title)
//     // console.log(sheet.rowCount)

//     // read rows
//     const rows = await sheet.getRows({ limit: 6, offset: 1 }) // can pass in { limit, offset }

//     const cryptos = rows.map((r) => r._rawData[0]).filter((c) => c !== '')

//     return cryptos

//     //   // adding / removing sheets
//     //   const newSheet = await doc.addSheet({ title: 'hot new sheet!' })
//     //   await newSheet.delete()
// }

;(async function () {
    const response = await getData()
    console.log(`gb🚀 ~ response`, response)
})()
