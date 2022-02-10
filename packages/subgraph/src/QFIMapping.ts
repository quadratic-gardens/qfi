import { BigInt, log, store } from '@graphprotocol/graph-ts'
import { OwnershipTransferred } from '../generated/GrantRoundFactory/GrantRoundFactory'
import {
    QFI as QFIContract,
    ContributionWithdrawn,
    DeployGrantRound,
    GrantRoundFinalized,
    Init, InitQfi, MergeStateAq, SignUp,
    Contribution as ContributionEvent,
    VotingPeriodClosed,
    PreRoundContributionPeriodStarted,
    PollProcessorAndTallyerChanged,
    MaciDeployed,
    QfiDeployed,
    FundingSourceAdded,
    FundingSourceRemoved
} from '../generated/QFI/QFI'
import {
    GrantRound as GrantRoundContract
} from '../generated/templates/GrantRound/GrantRound'
import { QFI as QFISchema, GrantRound, PublicKey, Coordinator, Contribution, Contributor, FundingSource } from "../generated/schema"

/**
 * Handle a smart contract based on MACI (constructor event).
 * @param event Ethereum event emitted when deploying a smart contract based on MACI.
 */
export function handleMaciDeployed(event: MaciDeployed): void {
    log.debug(`MACI Deployed event block: {}`, [event.block.number.toString()])

    // Get the QFI/MACI instance.
    const qfiAddress = event.address
    const qfiContract = QFIContract.bind(qfiAddress)
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    qfi.stateAqAddress = event.params._stateAq
    qfi.pollFactoryAddress = event.params._pollFactory
    qfi.initialVoiceCreditProxyAddress = event.params._intialVoiceCreditProxy
    qfi.signUpGatekeeperAddress = event.params._signUpGatekeeper
    qfi.signUpTimestamp = event.params._timestamp
    qfi.createdAt = event.block.timestamp.toString()

    // External call to contract instance (one time event - good trade-off for sync time).
    qfi.stateTreeDepth = qfiContract.stateTreeDepth()
    qfi.numSignUps = qfiContract.numSignUps()

    qfi.save()
}

/**
 * Handle a new QFI instance deploy.
 * @param event Ethereum event emitted when a new QFI instance is deployed.
 */
export function handleQfiDeployed(event: QfiDeployed): void {
    log.debug(`QFI Deployed event block: {}`, [event.block.number.toString()])

    // Get the QFI/MACI instance.
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        qfi.grantRoundFactoryAddress = event.params._grantRoundFactory
        qfi.nativeERC20TokenAddress = event.params._nativeToken
        qfi.voiceCreditFactor = event.params._voiceCreditFactor
        qfi.currentStage = "NotInitialized"

        qfi.save()

        log.info("QFI has been correctly deployed!", [])
    } else {
        log.error(`QFI entity not found!`, [])
    }
}

/**
 * Handle the initialization of a smart contract based on MACI.
 * @param event Ethereum event emitted when initializing a smart contract based on MACI.
 */
export function handleInitMaci(event: Init): void {
    log.debug(`Init MACI event block: {}`, [event.block.number.toString()])

    // Get the QFI/MACI instance.
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        qfi.vkRegistryAddress = event.params._vkRegistry
        qfi.messageAqFactoryPollAddress = event.params._messageAqFactory
        qfi.isInitialized = true

        qfi.save()
    }
}

/**
 * Handle the initialization of the QFI smart contract.
 * @param event Ethereum event emitted when initializing the QFI smart contract.
 */
export function handleInitQfi(event: InitQfi): void {
    log.debug(`Init QFI event block: {}`, [event.block.number.toString()])

    // Get the QFI/MACI instance.
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        qfi.messageAqFactoryGrantRoundAddress = event.params._messageAqFactoryGrantRounds
        qfi.currentStage = "WaitingForSignupsAndTopups"

        qfi.save()

        log.info("QFI has been correctly initialized", [])
    }
}

/**
* Handle the signup of a new user to QFI/MACI.
* @param event Ethereum event emitted when someone do signup on QFI/MACI.
*/
export function handleSignUp(event: SignUp): void {
    log.debug(`SignUp event block: {}`, [event.block.number.toString()])

    const publicKeyId = event.transaction.from.toHexString()
    const publicKey = PublicKey.load(publicKeyId)
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        if (publicKey === null) {
            // Create a new PublicKey instance.
            const publicKey = new PublicKey(publicKeyId)

            publicKey.x = event.params._userPubKey.x
            publicKey.y = event.params._userPubKey.y
            publicKey.stateIndex = event.params._stateIndex
            publicKey.voiceCreditBalance = event.params._voiceCreditBalance
            publicKey.timestamp = event.params._timestamp

            publicKey.save()

            log.info("A new PublicKey with ID '{}' has been created!", [publicKeyId])

        }

        // Update QFI.
        qfi.numSignUps = qfi.numSignUps.plus(BigInt.fromI32(1))
        qfi.lastUpdatedAt = event.block.timestamp.toString()

        qfi.save()

        log.info("QFI signups updated to '{}'!", [qfi.numSignUps.toString()])
    } else {
        log.error("QFI is not initialized!", [])
    }

}

/**
 * Handle the merge of the state message AQ.
 * @param event Ethereum event emitted when the state message AQ is merged.
*/
export function handleMergeStateAq(event: MergeStateAq): void {
    log.debug(`MergeStateAq event block: {}`, [event.block.number.toString()])

    const timestamp = event.block.timestamp.toString()
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        qfi.isStateAqMerged = true
        qfi.lastUpdatedAt = timestamp

        qfi.save()

        // Update GrantRound.
        const grantRound = GrantRound.load(qfi.currentGrantRound)

        if (grantRound !== null) {
            grantRound.stateAqMerged = true
            grantRound.lastUpdatedAt = timestamp

            grantRound.save()
        } else {
            log.error("GrantRound is not initialized!", [])
        }
    } else {
        log.error("QFI is not initialized!", [])
    }
}

/**
 * Handle the contribution in native ERC20 token to matching pool from a user.
 * @param event Ethereum event emitted when someone donates/fund the matching pool in exchange of VCs.
*/
export function handleContribution(event: ContributionEvent): void {
    log.debug(`Contribution event block: {}`, [event.block.number.toString()])

    // Get Contributor.
    const contributorId = event.params._contributor.toHexString()
    const contributor = Contributor.load(contributorId)
    const grantRoundId = event.params._currentGrantRound.toHexString()
    const timestamp = event.block.timestamp.toString()

    if (contributor === null) {
        const contributor = new Contributor(contributorId)
        contributor.address = event.params._contributor
        contributor.voiceCredits = event.params._voiceCredits
        contributor.isRegistered = false // TODO: To be checked.
        contributor.grantRounds = [grantRoundId]
        contributor.createdAt = timestamp
        contributor.lastUpdatedAt = timestamp

        contributor.save()
    } else {
        const grantRounds = contributor.grantRounds
        if (grantRounds !== null && !(grantRounds.find(grantRound => grantRound === grantRoundId))) {
            // Add the new GrantRound to the array.
            grantRounds.push(grantRoundId)
            contributor.grantRounds = grantRounds
        }
        contributor.voiceCredits = event.params._voiceCredits
        contributor.isRegistered = true // TODO: To be checked.
        contributor.lastUpdatedAt = timestamp

        contributor.save()
    }

    // Get QFI.
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)
    // Get the VoiceCreditFactor from QFI contract (for each contribution - trade off to be considered).
    const qfiContract = QFIContract.bind(qfiAddress)
    const voiceCreditFactor = qfiContract.voiceCreditFactor()

    // Create a new Contribution.
    const contributionId = grantRoundId.concat(contributorId)
    const contribution = new Contribution(contributionId)

    contribution.contributor = contributorId
    contribution.grantRound = grantRoundId
    contribution.amount = event.params._amount
    contribution.voiceCredits = event.params._amount.div(voiceCreditFactor)
    contribution.createdAt = timestamp
    contribution.lastUpdatedAt = timestamp

    contribution.save()

    // Update QFI.
    if (qfi !== null) {
        qfi.contributorCount = qfi.contributorCount.plus(
            BigInt.fromI32(1)
        )
        qfi.lastUpdatedAt = event.block.timestamp.toString()

        qfi.save()
    } else {
        log.error(`QFI entity not found!`, [])
    }
}

/**
 * Handle the withdrawn of a user contribution.
 * @param event Ethereum event emitted when someone withdraw a contribution.
*/
export function handleContributionWithdrawn(event: ContributionWithdrawn): void {
    log.debug(`ContributionWithdrawn event block: {}`, [event.block.number.toString()])

    // Get Contributor.
    const contributorId = event.params._contributor.toHexString()
    const grantRoundId = event.params._currentGrantRound.toHexString()
    const contributionId = grantRoundId.concat(contributorId)

    // Remove the Contribution from the store.
    store.remove('Contribution', contributionId)

    // Get QFI.
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    // Update QFI.
    if (qfi !== null) {
        qfi.contributorCount = qfi.contributorCount.minus(
            BigInt.fromI32(1)
        )
        qfi.lastUpdatedAt = event.block.timestamp.toString()

        qfi.save()
    } else {
        log.error(`QFI entity not found!`, [])
    }
}

/**
 * Handle the deploy of a new Grant Round.
 * @param event Ethereum event emitted when a new GrantRound smart contract instance is deployed.
*/
export function handleDeployGrantRound(event: DeployGrantRound): void {
    log.debug(`DeployGrantRound event block: {}`, [event.block.number.toString()])

    const grantRoundId = event.params._grantRoundId.toString()
    const grantRound = GrantRound.load(grantRoundId)

    const timestamp = event.block.timestamp.toString()
    const qfiAddress = event.address
    const coordinatorAddress = event.transaction.from
    const qfiContract = QFIContract.bind(qfiAddress)
    const voiceCreditFactor = qfiContract.voiceCreditFactor()

    if (grantRound === null) {
        // Create a new GrantRound instance.
        const grantRound = new GrantRound(grantRoundId)

        grantRound.duration = event.params._duration
        grantRound.maxMessages = event.params._maxValues.maxMessages
        grantRound.maxVoteOptions = event.params._maxValues.maxVoteOptions
        grantRound.messageTreeDepth = event.params._treeDepths.messageTreeDepth
        grantRound.messageTreeSubDepth = event.params._treeDepths.messageTreeSubDepth
        grantRound.voteOptionTreeDepth = event.params._treeDepths.voteOptionTreeDepth
        grantRound.intStateTreeDepth = event.params._treeDepths.intStateTreeDepth
        grantRound.deployTimestamp = event.block.timestamp
        grantRound.messageBatchSize = event.params._batchSizes.messageBatchSize
        grantRound.tallyBatchSize = event.params._batchSizes.tallyBatchSize
        grantRound.voiceCreditFactor = voiceCreditFactor
        grantRound.qfi = qfiAddress.toHexString()
        grantRound.coordinator = coordinatorAddress.toHexString()
        grantRound.createdAt = timestamp
        grantRound.lastUpdatedAt = timestamp

        grantRound.save()

        // Store the Coordinator.
        const coordinatorId = coordinatorAddress.toHexString()
        const coordinator = Coordinator.load(coordinatorId)

        if (coordinator === null) {
            const coordinator = new Coordinator(coordinatorId)

            coordinator.address = coordinatorAddress
            coordinator.publicKey = event.params._coordinatorPubKey.toString()
            coordinator.qfi = qfiAddress.toHexString()
            coordinator.grantRounds = [grantRoundId]

            coordinator.save()
        } else {
            const grantRounds = coordinator.grantRounds
            if (grantRounds !== null && !(grantRounds.find(grantRound => grantRound === grantRoundId))) {
                // Add the new GrantRound to the array.
                grantRounds.push(grantRoundId)
                coordinator.grantRounds = grantRounds
            }

            coordinator.save()
        }

        // Update QFI.
        const qfiId = qfiAddress.toHexString()
        const qfi = new QFISchema(qfiId)

        if (qfi !== null) {
            qfi.coordinator = coordinatorId
            qfi.currentGrantRound = grantRoundId.toString()
            qfi.nextGrantRoundId = qfi.nextGrantRoundId.plus(BigInt.fromI32(1))
            qfi.currentStage = "VotingPeriodOpen"
            qfi.lastUpdatedAt = event.block.timestamp.toString()

            qfi.save()
        } else {
            log.error(`QFI entity not found!`, [])
        }
    } else {
        log.error(`Grant Round already exists!`, [])
    }
}

/**
 * Handle the finalization step for a Grant Round.
 * @param event Ethereum event emitted when a Grant Round is finalized.
*/
export function handleGrantRoundFinalized(event: GrantRoundFinalized): void {
    log.debug(`GrantRoundFinalized event block: {}`, [event.block.number.toString()])

    // Get Grant Round.
    const grantRoundId = event.params._currentGrantRound.toHexString()
    const grantRoundContract = GrantRoundContract.bind(event.params._currentGrantRound)
    const grantRound = GrantRound.load(grantRoundId)

    // Read from Grant Round contract (there are no other possibilities to read these information).
    const totalSpent = grantRoundContract.totalSpent()
    const totalVotes = grantRoundContract.totalVotes()
    const tallyHash = grantRoundContract.tallyHash()
    const isFinalized = grantRoundContract.isFinalized()
    const isCancelled = grantRoundContract.isCancelled()
    const matchingPoolSize = grantRoundContract.matchingPoolSize()

    if (grantRound !== null) {
        grantRound.totalSpent = totalSpent
        grantRound.totalVotes = totalVotes
        grantRound.tallyHash = tallyHash
        grantRound.isFinalized = isFinalized
        grantRound.isCancelled = isCancelled
        grantRound.matchingPoolSize = matchingPoolSize

        grantRound.save()
    } else {
        log.error(`GrantRound entity not found!`, [])
    }

    // Update QFI.
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        qfi.currentStage = "Finalized"

        qfi.save()
    } else {
        log.error(`QFI entity not found!`, [])
    }
}

/**
 * (e.g., Add a Group in the storage).
 * @param event Ethereum event emitted when XYZ.
*/
export function handleOwnershipTransferred(event: OwnershipTransferred): void { }

/**
 * Handle the closing of the voting period for a Grant Round.
 * @param event Ethereum event emitted when a voting period for a Grant Round is over.
*/
export function handleVotingPeriodClosed(event: VotingPeriodClosed): void {
    log.debug(`VotingPeriodClosed event block: {}`, [event.block.number.toString()])

    // Update QFI.
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        qfi.currentStage = event.params._currentStage

        qfi.save()
    } else {
        log.error(`QFI entity not found!`, [])
    }
}

/**
 * Handle the pre round contribution period start for a Grant Round.
 * @param event Ethereum event emitted when a pre round contribution period for a Grant Round is starting.
*/
export function handlePreRoundContributionPeriodStarted(event: PreRoundContributionPeriodStarted): void {
    log.debug(`PreRoundContributionPeriodStarted event block: {}`, [event.block.number.toString()])

    // Update QFI.
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        qfi.currentStage = event.params._currentStage

        qfi.save()
    } else {
        log.error(`QFI entity not found!`, [])
    }
}

/**
 * Handle the update of the PPT contract used for a Grant Round.
 * @param event Ethereum event emitted when a PPT contract is set for a Grant Round.
*/
export function handlePollProcessorAndTallyerChanged(event: PollProcessorAndTallyerChanged): void {
    log.debug(`PollProcessorAndTallyerChanged event block: {}`, [event.block.number.toString()])

    // Update QFI.
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        qfi.pollProcessorAndTallyerAddress = event.params._pollProcessorAndTallyerNew

        qfi.save()
    } else {
        log.error(`QFI entity not found!`, [])
    }
}

/**
 * Handle the addition of a Funding Source.
 * @param event Ethereum event emitted when a Funding Source is added.
*/
export function handleFundingSourceAdded(event: FundingSourceAdded): void {
    log.debug(`FundingSourceAdded event block: {}`, [event.block.number.toString()])

    const timestamp = event.block.timestamp.toString()
    // Update QFI.
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        // Create a new Funding Source.
        const fundingSourceId = event.params._source.toHexString()
        const fundingSource = new FundingSource(fundingSourceId)

        fundingSource.address = event.params._source
        fundingSource.qfi = qfiId
        fundingSource.isActive = true
        fundingSource.createdAt = timestamp
        fundingSource.lastUpdatedAt = timestamp

        fundingSource.save()
    } else {
        log.error(`QFI entity not found!`, [])
    }
}

/**
 * Handle the removal of a Funding Source.
 * @param event Ethereum event emitted when a Funding Source is removed.
*/
export function handleFundingSourceRemoved(event: FundingSourceRemoved): void {
    log.debug(`FundingSourceRemoved event block: {}`, [event.block.number.toString()])

    const timestamp = event.block.timestamp.toString()
    // Update QFI.
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        const fundingSourceId = event.params._source.toHexString()
        const fundingSource = FundingSource.load(fundingSourceId)

        if (fundingSource !== null) {
            fundingSource.isActive = false
            fundingSource.lastUpdatedAt = timestamp

            fundingSource.save()
        } else {
            log.error(`FundingSource entity not found!`, [])
        }
    } else {
        log.error(`QFI entity not found!`, [])
    }
}

