#!/usr/bin/env node
import dotenv from "dotenv"
import { createCommand } from "commander"
import { readLocalJsonFile } from "./lib/files.js"
import { auth, genkeys, deploy, addRecipients } from "./commands/index.js"

dotenv.config()

const pkg = readLocalJsonFile("../../package.json")

const program = createCommand()

// Entry point.
program.name(pkg.name).description(pkg.description).version(pkg.version)

program
  .command("auth")
  .description("Allow to interact with the blockchain-related commands (e.g., deploy) with a wallet by passing in wallet's mnemonic.")
  .argument("<mnemonic>", "the secret mnemonic phrase (e.g., 12 words) separated by spaces")
  .action((mnemonic: string) => {
    auth(mnemonic)
  })

program
  .command("genkeys")
  .description("Generate a new specified amount of MACI and ETH keypairs (QR Codes inclueded)")
  .argument("<amount>", "amount of MACI and ETH keypairs to be generated")
  .action((amount: number) => {
    genkeys(amount)
  })
  .addHelpCommand(`ethpraguecli genkeys 3000`)

program
  .command("contracts:deploy")
  .description("Deploy the smart contracts infrastructure necessary for running a new QFI/MACI instance for a specified network")
  .argument("<network>", "the network where the contracts will be deployed")
  .action((network: string) => {
    deploy(network)
  })

program
  .command("contracts:add-recipients")
  .description("Add recipients on RecipientRegistry Smart Contract deployed on the network by taking data from CSV input file specified in the path")
  .argument("<network>", "the network where the contracts has been deployed")
  .argument("<path>", "the path of the CSV input file where the recipients data is stored")
  .action((network: string, path: string) => {
    addRecipients(network, path)
  })

program.parseAsync()