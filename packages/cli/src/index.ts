#!/usr/bin/env node

import { createCommand } from "commander"
import { readLocalJsonFile } from "./lib/utils.js"

const pkg = readLocalJsonFile("../../package.json")

const program = createCommand()

// Entry point.
program.name(pkg.name).description(pkg.description).version(pkg.version)

program
  .command("genkeys")
  .description("Generate a new specified amount of MACI and ETH keypairs")
  .argument("<quantity>", "amount of MACI and ETH keypairs to be generated")

program.parseAsync()
