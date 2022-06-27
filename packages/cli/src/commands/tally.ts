#!/usr/bin/env node
/* eslint-disable radix */
/* eslint-disable no-console */

import logSymbols from "log-symbols"
import { clear } from "console"
import chalk from "chalk"
import { BigNumberish, ethers } from "ethers"
import { Message, PubKey, PrivKey, Keypair } from "qaci-domainobjs"
import { MaciState } from "qaci-core"

import { connectToBlockchain, getNetworkExplorerUrl } from "../lib/blockchain.js"
import { QFI__factory } from "../../../contracts/typechain/factories/QFI__factory.js"
import { GrantRound__factory } from "../../../contracts/typechain/factories/GrantRound__factory.js"

import { cleanDir, directoryExists, makeDir, writeLocalJsonFile } from "../lib/files.js"
import { deployedContracts, header, mnemonicBaseDirPath, mnemonicFilePath, outputDirPath } from "../lib/constants.js"
import { askForConfirmation, customSpinner } from "../lib/prompts.js"

interface SignUpAction {
  type: string
  blockNumber: number
  transactionIndex: number
  stateIndex: number
  pubKey: string
  voiceCreditBalance: number
  timestamp: number
}

interface VoteAction {
  type: string
  blockNumber: number
  transactionIndex: number
  logIndex: number
  message: any
  encPubKey: string
}

interface GrantRoundAction {
  type: string
  blockNumber: number
  transactionIndex: number
  voiceCreditFactor: number
  coordinatorPubKey: string
}

function coordinatorServiceFetchProcessMessageProof(pollContractAddress, batchNumber) {
  const dummyProof: [
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish
  ] = [0, 0, 0, 0, 0, 0, 0, 0]
  return dummyProof
}

function coordinatorServiceFetchTallyVoteProof(pollContractAddress, batchNumber) {
  const dummyProof: [
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish
  ] = [0, 0, 0, 0, 0, 0, 0, 0]
  return dummyProof
}

/**
 * Initialize command.
 * @param network <string> - the network where the contracts are going to be deployed.
 */
async function tally(network: string, coordinatorPrivKey: string, matchingPoolAmount: string) {
  clear()

  console.log(header)
  //  TODO: save to local file
  // Save to local file.
  const maciBasePath = `${outputDirPath}/maci`
  const signUpsFilePath = `${outputDirPath}/maci/Signups.json`
  const grantRoundsFilePath = `${outputDirPath}/maci/GrantRounds.json`
  const votesFilePath = `${outputDirPath}/maci/Votes.json`
  const signUpFileExists = await directoryExists(signUpsFilePath)
  const grantRoundFileExists = await directoryExists(grantRoundsFilePath)
  const voteFileExists = await directoryExists(votesFilePath)
  try {
    // Check for output directory.
    if (!directoryExists(outputDirPath)) makeDir(outputDirPath)
    if (!directoryExists(maciBasePath)) makeDir(maciBasePath)
    // Check if mnemonic already present.
    if (!directoryExists(mnemonicBaseDirPath) && !directoryExists(mnemonicFilePath))
      throw new Error(`You must first authenticate by running \`auth \\"<your-mnemonic>\\"\` command!`)
    process.stdout.write(`\n`)

    /** NOTE: Set up Web3 Provider */
    const { provider, wallet } = await connectToBlockchain(network)
    const balanceInEthers = ethers.utils.formatEther((await wallet.getBalance()).toString())

    // const gasPrice = await provider.getGasPrice()
    // const double = BigNumber.from("2")
    // const doubleGasPrice = gasPrice.mul(double)
    const deployer = wallet
    const { confirmation: preFlightCheck } = await askForConfirmation(
      "Ready to Start the Tally Process? This will conduct operations offchain"
    )

    if (!preFlightCheck) {
      console.log(`\nFarewell👋`)
      process.exit(0)
    }

    // Get deployed contracts instances.
    const qfi = new ethers.Contract(deployedContracts.QFI, QFI__factory.abi, deployer)
    const grantRound = new ethers.Contract(deployedContracts.GrantRound, GrantRound__factory.abi, deployer)
    const startBlock = 22583796
    const currentBlock = await provider.getBlockNumber()

    const numBlocksPerRequest = 1000 // Around a day's worth of blocks
    /// //////////////////////////////////////////////////////////////////////////
    const spinner = customSpinner(`Read Smart Contracts`, "point")
    spinner.start()

    const qfiface = qfi.interface
    const grantRoundIface = grantRound.interface

    const coordinatorPubKeyOnChain = await grantRound.coordinatorPubKey()
    const coordinatorKeyPair: Keypair = new Keypair(PrivKey.unserialize(coordinatorPrivKey))
    const dd = await grantRound.getDeployTimeAndDuration()
    const deployTime = Number(dd[0])
    const duration = Number(dd[1])
    const lastBlock = (duration / (60 * 60 * 24) + 1) * 16000 + startBlock
    const onChainMaxValues = await grantRound.maxValues()
    const onChainTreeDepths = await grantRound.treeDepths()
    const onChainBatchSizes = await grantRound.batchSizes()
    const stateTreeDepth = await qfi.stateTreeDepth()

    const maxValues = {
      maxMessages: Number(onChainMaxValues.maxMessages.toNumber()),
      maxVoteOptions: Number(onChainMaxValues.maxVoteOptions.toNumber())
    }
    const treeDepths = {
      intStateTreeDepth: Number(onChainTreeDepths.intStateTreeDepth),
      messageTreeDepth: Number(onChainTreeDepths.messageTreeDepth),
      messageTreeSubDepth: Number(onChainTreeDepths.messageTreeSubDepth),
      voteOptionTreeDepth: Number(onChainTreeDepths.voteOptionTreeDepth)
    }
    const batchSizes = {
      tallyBatchSize: Number(onChainBatchSizes.tallyBatchSize),
      messageBatchSize: Number(onChainBatchSizes.messageBatchSize)
    }
    console.log(`\n`)
    console.log("Coordinator PubKey:", coordinatorPubKeyOnChain)
    console.log("Deploy Time:", deployTime)
    console.log("Duration:", duration)
    console.log("Max Values:", maxValues)
    console.log("Tree Depths:", treeDepths)
    console.log("Batch Sizes:", batchSizes)
    spinner.stop()
    let logsTotal = 0

    /// ///////////////////////////////////////////////////////////////////////////
    console.log(`${logSymbols.success}Fetch Sign up logs`)
    let signUps: SignUpAction[] = []
    logsTotal = 0
    try {
      // NOTE: Get SignUp Actions from QFI Smart Contract
      let signUpLogs = [] as any[]

      for (let i = startBlock; i < lastBlock; i += numBlocksPerRequest + 1) {
        const toBlock = i + numBlocksPerRequest >= currentBlock ? currentBlock : i + numBlocksPerRequest
        const logs = await provider.getLogs({
          ...qfi.filters.SignUp(),
          fromBlock: i,
          toBlock
        })

        logsTotal += logs.length
        console.log(`${logsTotal} signups found so far, scanned up to block number: ${i} / ${lastBlock}`)

        signUpLogs = signUpLogs.concat(logs)
      }
      console.log("Fetched", signUpLogs.length, "signups\n")

      // NOTE: Decode into actions, sort and save to local file (if not already present).
      signUps = signUpLogs
        .map((log) => {
          const event = qfiface.parseLog(log)

          return {
            type: "SignUp",
            blockNumber: log.blockNumber,
            transactionIndex: log.transactionIndex,
            stateIndex: Number(event.args._stateIndex),
            pubKey: new PubKey(event.args._userPubKey.map((x) => BigInt(x))).serialize(),
            voiceCreditBalance: Number(event.args._voiceCreditBalance),
            timestamp: Number(event.args._timestamp)
          }
        })
        .sort((a, b) => {
          const checkBlock = a.blockNumber - b.blockNumber
          const checkTxIndex = a.transactionIndex - b.transactionIndex
          return checkBlock === 0 ? checkTxIndex : checkBlock
        })
    } catch (err) {
      throw Error(`Failed to get MACI State from Smart Contracts: ${err.message}`)
    }
    // /// ///////////////////////////////////////////////////////////////////////////
    console.log(`${logSymbols.success}Fetch GrantRound logs`)
    logsTotal = 0
    let grantRounds: GrantRoundAction[] = []
    try {
      // NOTE: Get GrantRound Actions from GrantRound Smart Contracts
      let grantRoundLogs = [] as any[]
      for (let i = startBlock; i < lastBlock; i += numBlocksPerRequest + 1) {
        const toBlock = i + numBlocksPerRequest >= currentBlock ? currentBlock : i + numBlocksPerRequest
        const logs = await provider.getLogs({
          ...qfi.filters.GrantRoundDeployed(),
          fromBlock: i,
          toBlock
        })

        logsTotal += logs.length
        console.log(`${logsTotal} grantRounds found so far, scanned up to block number: ${i} / ${lastBlock}`)

        grantRoundLogs = grantRoundLogs.concat(logs)
      }
      // NOTE: Decode into actions, sort and save to local file (if not already present).
      grantRounds = grantRoundLogs
        .map((log) => {
          const event = qfiface.parseLog(log)
          return {
            type: "GrantRoundDeployed",
            blockNumber: log.blockNumber,
            transactionIndex: log.transactionIndex,
            voiceCreditFactor: Number(event.args._voiceCreditFactor),
            coordinatorPubKey: new PubKey(event.args._coordinatorPubKey.map((x) => BigInt(x))).serialize()
          }
        })
        .sort((a, b) => {
          const checkBlock = a.blockNumber - b.blockNumber
          const checkTxIndex = a.transactionIndex - b.transactionIndex
          return checkBlock === 0 ? checkTxIndex : checkBlock
        })
    } catch (err) {
      throw Error(`Failed to get MACI State from Smart Contracts: ${err.message}`)
    }

    /// ///////////////////////////////////////////////////////////////////////////
    console.log(`${logSymbols.success}Fetch Vote logs`)
    logsTotal = 0
    let votes: VoteAction[] = []
    try {
      // NOTE: Get Vote Actions from GrantRound Smart Contracts
      let voteLogs = [] as any[]

      for (let i = startBlock; i < lastBlock; i += numBlocksPerRequest + 1) {
        const toBlock = i + numBlocksPerRequest >= currentBlock ? currentBlock : i + numBlocksPerRequest
        const logs = await provider.getLogs({
          ...grantRound.filters.PublishMessage(),
          fromBlock: i,
          toBlock
        })

        logsTotal += logs.length
        console.log(`${logsTotal} votes found so far, scanned up to block number: ${i} / ${lastBlock}`)

        voteLogs = voteLogs.concat(logs)
      }

      // NOTE: Decode into actions, sort and save to local file (if not already present).
      votes = voteLogs
        .map((log) => {
          const event = grantRoundIface.parseLog(log)
          const message = event.args._message[0].map((x) => x.toString())
          const encPubKey = new PubKey(event.args._encPubKey.map((x) => BigInt(x.toString()))).serialize()
          return {
            type: "PublishMessage",
            blockNumber: log.blockNumber,
            transactionIndex: log.transactionIndex,
            logIndex: log.logIndex,
            message,
            encPubKey
          }
        })
        .sort((a, b) => {
          const checkBlock = a.blockNumber - b.blockNumber
          const checkTxIndex = a.transactionIndex - b.transactionIndex
          return checkBlock === 0 ? checkTxIndex : checkBlock
        })
    } catch (err) {
      throw Error(`Failed to get MACI State from Smart Contracts: ${err.message}`)
    }
    // ///////////////////////////////////////////////////////////////////////////

    // NOTe: Build Maci State locally from SignUp and GrantRound actions
    const maciState: MaciState = new MaciState()

    console.log(`\n`)
    console.log("Votes:", votes.length)
    console.log("SignUps:", signUps.length)
    console.log("GrantRounds:", grantRounds.length)
    /// ///////////////////////////////////////////////////////////////////////////

    console.log(`${logSymbols.success}Fetched MACI State from Contract`)
    console.log(`${logSymbols.success}Building MACI State locally: process signups`)
    for (const { pubKey, voiceCreditBalance, timestamp } of signUps) {
      maciState.signUp(PubKey.unserialize(pubKey), voiceCreditBalance, timestamp)
    }
    console.log(`${logSymbols.success}Building MACI State locally: process grant rounds`)

    for (const grantRound of grantRounds) {
      console.log(`\n ${grantRound.coordinatorPubKey}`)
      maciState.deployPoll(
        duration,
        BigInt(deployTime + duration),
        maxValues,
        treeDepths,
        batchSizes.messageBatchSize,
        coordinatorKeyPair
      )

      console.log(grantRound)
    }
    console.log(`${logSymbols.success}Building MACI State locally: process votes`)

    for (const { message, encPubKey } of votes) {
      const _message = new Message(message.map((x) => BigInt(x)))

      const _encPubKey = PubKey.unserialize(encPubKey)

      console.log(`\n Processing message with DH key:`)
      console.log(`${encPubKey}`)
      maciState.polls[0].publishMessage(_message, _encPubKey)
    }
    console.log(`\n${logSymbols.info} Succcess: Built MACI State, gen SNARK Circtuit inputs \n`)

    console.log("Circuit input in Batches + Proof Generation")
    // NOTE: Merge state tree offchain
    const maciStateAq = maciState.stateAq
    maciStateAq.mergeSubRoots(0) // 0 as input attempts to merge all subroots
    maciStateAq.merge(stateTreeDepth)

    // NOTE: Merge message tree offchain
    const maciPoll = maciState.polls[0]
    maciPoll.messageAq.mergeSubRoots(0) // NOTE: 0 as input attempts to merge all subroots
    maciPoll.messageAq.merge(treeDepths.messageTreeDepth)

    // NOTE: Circuit input generation offchain
    const processMessagesCircuitInputsByBatch = []
    while (maciPoll.hasUnprocessedMessages()) {
      const circuitInputs = maciPoll.processMessages(0) // Process _batchSize messages starting from the saved index.

      // NOTE: new state root and ballot root commitment calculated off chain
      const { newSbCommitment } = circuitInputs
      console.log(`Batch - ${maciPoll.currentMessageBatchIndex} left`)
      processMessagesCircuitInputsByBatch.push(circuitInputs)
    }

    // NOTE: Proof Generation offchain
    const processMessagesVerifierInputsByBatch = processMessagesCircuitInputsByBatch.map(
      (circuitInputs, batchNumber) => {
        // NOTE: these are required for the Verifier Contract onchain
        const proof = coordinatorServiceFetchProcessMessageProof(deployedContracts.GrantRound, batchNumber)
        const maciNewSbCommitment = circuitInputs.newSbCommitment
        const pollAddress = deployedContracts.GrantRound
        return {
          pollAddress,
          maciNewSbCommitment,
          proof
        }
      }
    )

    const tallyVotesCircuitInputsByBatch = []
    while (maciPoll.hasUntalliedBallots()) {
      const circuitInputs = maciPoll.tallyVotes() // Process _batchSize ballots starting from the saved index.

      // NOTE: new stally commitment calculated off chain
      const { newTallyCommitment } = circuitInputs

      console.log(`Batch${maciPoll.numBatchesTallied}`)

      tallyVotesCircuitInputsByBatch.push(circuitInputs)
      console.log("/=========TALLY SO FAR==========/")
      console.log(maciPoll.results.map((x: any) => x.toString()))
    }

    // NOTE: Proof Generation offchain
    const tallyVotesVerifierInputsByBatch = tallyVotesCircuitInputsByBatch.map((circuitInputs, batchNumber) => {
      // NOTE: these are required for the Verifier Contract onchain

      const proof = coordinatorServiceFetchTallyVoteProof(deployedContracts.GrantRound, batchNumber)
      const { newTallyCommitment } = circuitInputs
      const { newResultsRootSalt } = circuitInputs
      const { newSpentVoiceCreditSubtotalSalt } = circuitInputs
      const { newPerVOSpentVoiceCreditsRootSalt } = circuitInputs
      const pollAddress = deployedContracts.GrantRound

      return {
        pollAddress,
        newTallyCommitment,
        proof,
        newResultsRootSalt,
        newSpentVoiceCreditSubtotalSalt,
        newPerVOSpentVoiceCreditsRootSalt
      }
    })

    const finalProcessMessagesCircuitInputs =
      processMessagesCircuitInputsByBatch[processMessagesCircuitInputsByBatch.length - 1]
    const finalTallyCircuitInputs = tallyVotesVerifierInputsByBatch[tallyVotesVerifierInputsByBatch.length - 1]

    const maciNewSbCommitment = finalProcessMessagesCircuitInputs.newSbCommitment

    const { newTallyCommitment } = finalTallyCircuitInputs
    const tallyResults: string[] = maciPoll.results.map((x: any) => x.toString())
    const tallySalt = finalTallyCircuitInputs.newResultsRootSalt
    const voiceCreditsSpent = maciPoll.totalSpentVoiceCredits.toString()
    const voiceCreditsSalt = finalTallyCircuitInputs.newSpentVoiceCreditSubtotalSalt
    const perVOSpentTally = maciPoll.perVOSpentVoiceCredits.map((x: any) => x.toString())
    const perVOSpentSalt = finalTallyCircuitInputs.newPerVOSpentVoiceCreditsRootSalt
    const tallyFileData = {
      maci: qfi.address,
      pollId: 0,
      newTallyCommitment,
      results: {
        tally: tallyResults,
        salt: tallySalt
      },
      totalSpentVoiceCredits: {
        spent: voiceCreditsSpent,
        salt: voiceCreditsSalt
      },
      perVOSpentVoiceCredits: {
        tally: perVOSpentTally,
        salt: perVOSpentSalt
      }
    }
    console.log("/=========FINAL TALLY RESULTS==========/")
    console.log(tallyFileData)

    // TODO: calculate subsidy
    const squareOfTally: number[] = tallyResults.map((voteTotal) => parseInt(voteTotal) ** 2)

    const sumOfSquareOfTally = squareOfTally.reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    const { confirmation: preFlightCheck2 } = await askForConfirmation(
      `Expected Matching pool is ${matchingPoolAmount} xDAI, Are you ready to continue?`
    )

    const preFlightCheck3 = parseInt(balanceInEthers) > (parseInt(matchingPoolAmount)+1)
    if (!preFlightCheck2) {
      console.log(`\n Make sure you have the matching pool amount in your account next time! 👋`)
      process.exit(0)
    }
    // if (!preFlightCheck3) {
    //   console.log(`\n Insufficient Funds: Make sure you have the matching pool amount + gas in your account next time! 👋`)
    //   process.exit(0)
    // }

    // TODO: replace with subgraph
    const projectNameByStateId = {
      1: "CZK FX rate on chain",
      2: "MindfulDropin",
      3: "Sázíme stromy: We plant trees where others won´t",
      4: "Pragashrooms",
      5: "Indices.fi",
      6: "United Vision",
      7: "Crypto Portal",
      8: "Gwei.cz",
      9: "Bohemian DAO",
      10: "Woke Framework",
      11: "UTXO Foundation",
      12: "NFTurtle",
      13: "EthPragueDva",
      14: "Bordel Hackerspace",
      15: "Paralelní Polis",
      16: "Octopus Lab | Agama Point Community",
      17: "Holešovice Testnet"
    }
    const projectAddressByStateId = {
      1: "0x9C81E538B9523CA46421a03F1C351b00b765b92f",
      2: "0x5aB7505Af5Ee7686a1C56edb582621E1f0484A5F",
      3: "0x059FdC73e9bed40265D0afAC73D04B604b02722A",
      4: "0x9B8BB786550749d34e56b16De4385C306540020E",
      5: "0xFBb777a2DDdF9309B505B0ac594b0977898c7a92",
      6: "0x0C5249B8c1DbFC72C9502638243812dbBfdf8Bcb",
      7: "0x3F24e9829AE70b756eD28A8cAC76C28A3AF2cD26",
      8: "0x41198CE04A731ad2F3F397FA898F9f34b9fe7002",
      9: "0x41198CE04A731ad2F3F397FA898F9f34b9fe7002",
      10: "0x9C6696C44dE739b51d3aDf51c87E98e19dD33337",
      11: "0x49A6D3e146f4C032f97B65A2c5E05B1196d69026",
      12: "0x5Fd8bE6bd01F932D6FcBCeAB1582F8adbC92e76B",
      13: "0x46022C178984bDc20658aBd1435ce6deFF87DA74",
      14: "0xe83E0b36bc68c1407B81B6d42CA4bd23FC309517",
      15: "0x42105F249681ff262D6aB723bf19Bc854656E619",
      16: "0xC31706B00379B370458683E907F63F647b15aB5C",
      17: "0xC64F0115325E8cdc6f1F3dc26DdbC501eD855847"
    }

    console.log(`\n Calculating QF subsidy results`)
    const subsidyPerProject = squareOfTally.map((squareOfTally, index) => {
      if (squareOfTally > 0) {
        const subsidyPercent = squareOfTally / sumOfSquareOfTally
        console.log(
          `\n${projectNameByStateId[index]}@${projectAddressByStateId[index]}: ${
            subsidyPercent * parseInt(matchingPoolAmount)
          } xDAI`
        )
        return subsidyPercent
      }
      return 0
    })

 


    console.log(chalk.bold(`\n Subsidy results calculated`))


    console.log(chalk.bold(`\n you are about to pay out recipients`))
    const { confirmation: preFlightCheck1 } = await askForConfirmation("Ready?")
    // const preFlightCheck2 = balanceInEthers <= matchingPoolAmount;
    if (!preFlightCheck1) {
      console.log(`\nFarewell 1👋`)
      process.exit(0)
    }

    console.log("Save Result Logs")
    await writeLocalJsonFile(signUpsFilePath, JSON.parse(JSON.stringify(signUps, null, 2)))
    await writeLocalJsonFile(grantRoundsFilePath, JSON.parse(JSON.stringify(grantRounds, null, 2)))
    await writeLocalJsonFile(votesFilePath, JSON.parse(JSON.stringify(votes, null, 2)))
  } catch (err: any) {
    console.log(err)
    if (!err.transactionHash) console.log(`\n${logSymbols.error} Something went wrong: ${err}`)
    else
      console.log(
        `\n${logSymbols.error} Something went wrong with the transaction! More info here: ${chalk.bold(
          `${getNetworkExplorerUrl(network)}tx/${err.transactionHash}`
        )}`
      )
    process.exit(0)
  }
}

export default tally
