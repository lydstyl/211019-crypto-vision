'use strict'

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const ccxt = require('ccxt')

import { getAccounts } from '../googleSheets/dataFromSheets'

// get auto account with crypto names and amounts
export const getAutoAccount = (name: string): void => {
    console.log(name)
}

// get all auto accounts with crypto names and amounts
export const getAllAutoAccounts = async (): Promise<void> => {
    const accountNames = await getAutoAccountsNames()
    console.log(`gb🚀 ~ getAllAutoAccounts ~ accountNames`, accountNames)
}

const getAutoAccountsNames = async (): Promise<string[]> => {
    const autoAccounts = await getAccounts('auto')
    console.log(`gb🚀 ~ getAutoAccountsNames ~ autoAccounts`, autoAccounts)

    return ['a', 'b']
}
