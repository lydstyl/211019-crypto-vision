// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import {
    GoogleSpreadsheet,
    GoogleSpreadsheetRow,
    GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet'

import { Account, Accounts } from '../cryptoVision'

const rowsCount = 19

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

    writeToCalc = async (cryptoVision): Promise<void> => {
        let sheet
        try {
            sheet = await this.getSheet()
            await sheet.loadCells('A22:J84') // loads a range of cells
            console.log(sheet.cellStats) // total cells, loaded, how many non-empty
        } catch (error) {
            console.log(`gb🚀 ~ SpreadSheet ~ writeToCalc= ~ error`, error)
        }

        const firstRow = 22
        const firstRowInd: number = firstRow - 1
        const lastRow = 84
        const lastRowInd: number = lastRow - 1
        const lastColInd = 9

        // CLEAR BEFORE WRITE
        for (let i = firstRowInd; i <= lastRowInd; i++) {
            for (let j = 0; j <= lastColInd; j++) {
                const cell = sheet.getCell(i, j) // access cells using a zero-based index
                cell.value = '_'
            }
        }

        // WRITE FIRST 2 CELLS
        const firstCell = sheet.getCell(firstRowInd, 0)
        firstCell.value = 'crypto'
        const secondCell = sheet.getCell(firstRowInd, 1)
        secondCell.value = 'usdPrice'

        // WRITE HEADER ACCOUNT NAMES
        const accounts = cryptoVision.accounts
        Object.keys(accounts).forEach((accountName, colIndex) => {
            const cell = sheet.getCell(firstRowInd, colIndex + 2)
            cell.value = accountName
        })

        // PREPARE DATA
        interface DraftRows {
            [cryptoSymbol: string]: (number | string)[]
        }

        const draftRows: DraftRows = {}

        const accountsArr = Object.keys(accounts)

        const colNumber = Array(accountsArr.length + 2)
            .join('.')
            .split('.')

        accountsArr.forEach((accountName, accountIndex) => {
            const account = accounts[accountName]

            Object.keys(account).forEach((cryptoName) => {
                const crypto = account[cryptoName]

                const { price, amount } = crypto

                if (!draftRows[cryptoName]) {
                    draftRows[cryptoName] = [...colNumber]
                }

                if (!draftRows[cryptoName][0]) {
                    draftRows[cryptoName][0] = cryptoName
                }
                if (!draftRows[cryptoName][1]) {
                    draftRows[cryptoName][1] = price === undefined ? 0 : price
                }

                if (!draftRows[cryptoName][accountIndex + 2]) {
                    draftRows[cryptoName][accountIndex + 2] = amount
                }
            })
        })

        // WRITE
        Object.keys(draftRows).forEach((crypto, rowIndex) => {
            const draftRow = draftRows[crypto]
            for (let i = 0; i < draftRow.length; i++) {
                const cell = sheet.getCell(rowIndex + firstRow, i)
                cell.value = draftRow[i]
            }
        })

        // a1.value = 123.456
        // c6.formula = '=A1'
        // a1.textFormat = { bold: true }
        // c6.note = 'This is a note!'

        try {
            await sheet.saveUpdatedCells() // save all updates in one call
        } catch (error) {
            console.log(`gb🚀 ~ SpreadSheet ~ writeToCalc= ~ error`, error)
        }
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

        const rows = rawRows
            .filter((r) => {
                return r[name] !== undefined
            })

            .map((r) => ({
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
