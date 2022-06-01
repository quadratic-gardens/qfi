#!/usr/bin/env node
import inquirer from "inquirer"
import logSymbols from "log-symbols"
import { getWalletFromMnemonic } from "../lib/blockchain.js"
import { directoryExists, makeDir, toTextFile } from "../lib/files.js"

/**
 * Auth command.
 * @param mnemonic <string> - the secret mnemonic phrase (e.g., 12 words) separated by spaces.
 */
async function auth(mnemonic: string) {
    try {
        const dirPath = `./output`
        const mnemonicFilePath = `${dirPath}/mnemonic.txt`

        // Create directories if not already generated.
        if (!directoryExists(dirPath))
            makeDir(dirPath)
        else if (directoryExists(mnemonicFilePath)) {
            //NOTE: prompt user to confirm override current mnemonic.
            console.log(`\n${logSymbols.warning} You already have insert a mnemonic. This command will override it.`)
            const answer = await inquirer.prompt([
                {
                    type: "confirm",
                    name: "continue",
                    message: `Do you want to continue?`,
                    default: false
                }
            ])

            if (!answer.continue) {
                throw new Error(`You decided to stop the process.`)
            }
        }

        // Get wallet from mnemonic.
        const wallet = getWalletFromMnemonic(mnemonic)

        // Store mnemonic locally.
        toTextFile(`${dirPath}`, `mnemonic`, mnemonic)

        console.log(
            `\nYou have successfully logged in with your mnemonic 🎊\n${wallet.address} should be your first Ethereum account address in your wallet!`
        )
    } catch (err: any) {
        console.log(`${logSymbols.error} Something went wrong: ${err.message ?? err}`)
    }
}

export default auth
