'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ccxt = require('ccxt')

import { getAccounts } from '../googleSheets/dataFromSheets'
import { Accounts, Account } from '../cryptoVision'

// get auto account with crypto names and amounts
export const getAutoAccount = (name: string): void => {
    console.log(name)
}

// get all auto accounts with crypto names and amounts
export const getAllAutoAccounts = async (): Promise<Accounts> => {
    const accountNames = await getAutoAccountsNames()

    const balances = fetchBalances(accountNames)

    const balances2 = await Promise.all(balances)

    const autoAccounts = {}
    accountNames.forEach((name, index) => {
        autoAccounts[name] = balances2[index]
    })

    return autoAccounts
}

const getAutoAccountsNames = async (): Promise<string[]> => {
    const autoAccounts = await getAccounts('auto')

    const autoAccountsNames = Object.keys(autoAccounts)

    return autoAccountsNames
}

const fetchBalances = (accountNames: string[]): Promise<Account>[] => {
    return accountNames.map(async (accountName) => {
        const exchangeClass = ccxt[accountName]
        const bigName = accountName.toUpperCase()

        const autoAccount = new exchangeClass({
            apiKey: process.env[`${bigName}_KEY`],
            secret: process.env[`${bigName}_SECRET`],
            uid: process.env[`${bigName}_UID`],
        })

        const balance = await autoAccount.fetchBalance()

        const total = balance.total

        const account = {}
        Object.keys(total).forEach((crypto) => {
            if (total[crypto] !== 0) {
                account[crypto] = { price: undefined, amount: total[crypto] }
            }
        })

        return account
    })
}
