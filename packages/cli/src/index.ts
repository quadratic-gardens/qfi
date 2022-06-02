#!/usr/bin/env node
import dotenv from "dotenv"
import { createCommand } from "commander"
import { readLocalJsonFile } from "./lib/files.js"
import { auth, genkeys, deploy, registerRecipients } from "./commands/index.js"

dotenv.config()

const pkg = readLocalJsonFile("../../package.json")

const program = createCommand()

// Entry point.
program.name(pkg.name).description(pkg.description).version(pkg.version)

program
  .command("auth")
  .description("Allow to interact with the blockchain-related commands (e.g., deploy) with a wallet.")
  .argument("<mnemonic>", "the secret mnemonic phrase (e.g., 12 words) separated by spaces")
  .action((mnemonic: string) => {
    auth(mnemonic)
  })

program
  .command("genkeys")
  .description("Generate a new specified amount of MACI and ETH keypairs")
  .argument("<quantity>", "amount of MACI and ETH keypairs to be generated")
  .action((quantity: number) => {
    genkeys(quantity)
  })

program
  .command("deploy")
  .description("Deploy the smart contracts infrastructure necessary for running a new QFI/MACI instance")
  .argument("<network>", "the network where the contracts are going to be deployed")
  .action((network: string) => {
    deploy(network)
  })

program
  .command("register-recipients")
  .description("Register recipients on RecipientRegistry Smart Contract by taking data from CSV input file")
  .argument("<network>", "the network where the contracts has been deployed")
  .argument("<path>", "the path of the CSV input file where the recipients data is stored")
  .action((network: string, path: string) => {
    registerRecipients(network, path)
  })

program.parseAsync()
