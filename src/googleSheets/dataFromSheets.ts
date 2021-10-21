// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet'

import { Account } from '../cryptoVision'

const rowsCount = 6

class SpreadSheet {
    spreadsheetId: string
    rowsCount: number
    sheet: unknown
    // rows: Promise<GoogleSpreadsheetRow[]>

    constructor(spreadsheetId: string, rowsCount: number) {
        this.spreadsheetId = spreadsheetId
        this.rowsCount = rowsCount

        // this.rows = this.getRows()
    }

    async getRows(): Promise<GoogleSpreadsheetRow[]> {
        // Initialize the sheet - doc ID is the long id in the sheets URL
        const doc = new GoogleSpreadsheet(this.spreadsheetId)

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
        // const sheet = doc.sheetsByIndex[4] // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
        const sheet = doc.sheetsByTitle['crypto3']
        this.sheet = sheet

        /////////
        let rows

        try {
            // read rows
            rows = await sheet.getRows({ limit: this.rowsCount, offset: 0 }) // can pass in { limit, offset }
        } catch (error) {
            console.log('ERROR WHILE GETTING SHEET ROWS')
            console.log(error)
        }

        // const cryptos = rows.map((r) => r._rawData[0]).filter((c) => c !== '')

        return rows
    }

    async getAccount(name: string): Promise<Account> {
        const rawRows = await this.getRows()

        const rows = rawRows.map((r) => ({
            [r['crypto']]: { price: 0, amount: r[name] },
        }))

        const account = {}
        rows.forEach((row) => {
            const keys = Object.keys(row)

            account[keys[0]] = row[keys[0]]
        })

        return account
    }

    // async getAccountNames(): Promise<string[]> {
    //     const rawRows = await this.sheet.getRows({
    //         limit: this.rowsCount,
    //         offset: 0,
    //     })
    // }
}

;(async function () {
    const patrimoine = new SpreadSheet(process.env.GOOGLE_DOC_ID, rowsCount)

    const ledgerBlack = await patrimoine.getAccount('ledgerBlack')
    console.log(`gb🚀 ~ ledgerBlack`, ledgerBlack)
})()

export default SpreadSheet
