// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import {
    GoogleSpreadsheet,
    GoogleSpreadsheetRow,
    GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet'

import { Account, Accounts } from '../cryptoVision'

const rowsCount = 6

class SpreadSheet {
    spreadsheetId: string
    rowsCount: number
    sheet: unknown

    constructor(spreadsheetId: string, rowsCount: number) {
        this.spreadsheetId = spreadsheetId
        this.rowsCount = rowsCount
    }

    async getSheet(): Promise<GoogleSpreadsheetWorksheet> {
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
        const sheet = doc.sheetsByTitle[process.env.GOOGLE_SHEET_TITLE]
        this.sheet = sheet

        return sheet
    }

    async getRows(): Promise<GoogleSpreadsheetRow[]> {
        const sheet = await this.getSheet()

        let rows

        try {
            // read rows
            rows = await sheet.getRows({ limit: this.rowsCount, offset: 0 }) // can pass in { limit, offset }
        } catch (error) {
            console.log('ERROR WHILE GETTING SHEET ROWS')
            console.log(error)
        }

        return rows
    }

    async getAccount(name: string): Promise<Account> {
        const rawRows = await this.getRows()

        const rows = rawRows.map((r) => ({
            [r['crypto']]: { price: undefined, amount: r[name] },
        }))

        const account = {}
        rows.forEach((row) => {
            const keys = Object.keys(row)

            account[keys[0]] = row[keys[0]]
        })

        return account
    }

    async getAccountNames(): Promise<string[]> {
        const sheet = await this.getSheet()

        try {
            await sheet.loadHeaderRow()

            const headerValues = sheet.headerValues
            headerValues.shift()

            return headerValues
        } catch (error) {
            console.log('ERROR WHEN GET ROWS FOR GET ACCOUNT NAMES')
            console.log(error)
        }
        return []
    }
}

const isManual = (accountName: string): boolean => {
    return accountName === accountName.toUpperCase()
}

export const getAccounts = async (
    accountsFilter: 'all' | 'auto' | 'manual',
): Promise<Accounts> => {
    const patrimoine = new SpreadSheet(process.env.GOOGLE_DOC_ID, rowsCount)

    const accountNames = await patrimoine.getAccountNames()

    const rawAccounts: { [name: string]: Promise<Account> } = {}
    accountNames
        .filter((accountName) => {
            if (accountsFilter === 'all') {
                return true
            }

            if (accountsFilter === 'auto') {
                return !isManual(accountName)
            }

            return isManual(accountName)
        })
        .forEach((accountName) => {
            const account = patrimoine.getAccount(accountName)
            rawAccounts[accountName] = account
        })

    const promises: Promise<Account>[] = accountNames.map(
        (key) => rawAccounts[key],
    )
    const accountsList: Account[] = await Promise.all(promises).then(
        (values) => values,
    )

    const accounts: Accounts = {}
    accountNames.forEach((accountName, index) => {
        if (accountsList[index]) {
            accounts[accountName] = accountsList[index]
        }
    })

    return accounts
}

export default SpreadSheet
