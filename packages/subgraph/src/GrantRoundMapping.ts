import { log } from "@graphprotocol/graph-ts"
import {
    Contributor,
    Donation,
    GrantRound as GrantRoundSchema,
    GrantRoundRecipient,
    Message,
    PublicKey,
    Recipient,
    Vote
} from "../generated/schema"
import {
    OwnershipTransferred,
    PublishMessage,
    MergeMessageAq,
    GrantRoundCancelled,
    FundsClaimed,
    TallyPublished,
    Voted,
    GrantRound as GrantRoundContract
} from "../generated/templates/GrantRound/GrantRound"

/**
 * (e.g., Store a PublicKey in the storage).
 * @param event Ethereum event emitted when XYZ.
 */
export function handleOwnershipTransferred(event: OwnershipTransferred): void {
    log.debug(`OwnershipTransferred event block: {}`, [event.block.number.toString()])
}

/**
 * Handle the publishing of a message by a registered user.
 * @param event Ethereum event emitted when a user publishes a message.
 */
export function handlePublishMessage(event: PublishMessage): void {
    log.debug(`PublishMessage event block: {}`, [event.block.number.toString()])

    const txSender = event.transaction.from
    // Get Grant Round.
    const grantRoundId = event.address.toHexString()
    const grantRound = GrantRoundSchema.load(grantRoundId)

    if (grantRound !== null) {
        // Create a new Message.
        const messageId = event.transaction.hash.toHexString()
        const message = new Message(messageId)

        const publicKeyId = txSender.toHexString()
        const publicKey = PublicKey.load(publicKeyId)

        if (publicKey === null) {
            const publicKey = new PublicKey(publicKeyId)

            // The first message is now recorded as published w/ this public key.
            publicKey.x = event.params._encPubKey.x
            publicKey.y = event.params._encPubKey.y
            publicKey.messages = [messageId]
            publicKey.grantRound = grantRoundId

            publicKey.save()
        } else {
            log.error(`PublicKey entity not found!`, [])
        }

        message.sender = txSender
        message.data = event.params._message.data
        message.txHash = event.transaction.hash
        message.publicKey = publicKeyId
        message.grantRound = grantRoundId
        message.timestamp = event.block.timestamp.toString()

        message.save()
    } else {
        log.error(`GrantRound entity not found!`, [])
    }
}

/**
 * Handle the merge of the message AQ used by the Grant Round.
 * @param event Ethereum event emitted when the Grant Round message AQ is merged.
 */
export function handleMergeMessageAq(event: MergeMessageAq): void {
    log.debug(`MergeMessageAq event block: {}`, [event.block.number.toString()])

    const grantRoundId = event.address.toHexString()
    const grantRound = GrantRoundSchema.load(grantRoundId)

    if (grantRound !== null) {
        grantRound.mergedStateRoot = event.params._messageRoot

        grantRound.save()
    } else {
        log.error(`GrantRound entity not found!`, [])
    }
}

/**
 * Handle the cancellation of the Grant Round.
 * @param event Ethereum event emitted when the Grant Round message AQ is merged.
 */
export function handleGrantRoundCancelled(event: GrantRoundCancelled): void {
    log.debug(`GrantRoundCancelled event block: {}`, [event.block.number.toString()])

    const grantRoundId = event.address.toHexString()
    const grantRound = GrantRoundSchema.load(grantRoundId)

    if (grantRound !== null) {
        grantRound.isCancelled = event.params._isCancelled
        grantRound.isFinalized = event.params._isFinalized

        grantRound.save()
    } else {
        log.error(`GrantRound entity not found!`, [])
    }
}

/**
 * Handle the claiming of the funds from the matching pool of the GrantRound.
 * @param event Ethereum event emitted when a recipient claim the funds from the matching pool of the GrantRound.
 */
export function handleFundsClaimed(event: FundsClaimed): void {
    log.debug(`FundsClaimed event block: {}`, [event.block.number.toString()])

    const timestamp = event.block.timestamp.toString()

    // Get GrantRound.
    const grantRoundAddress = event.address
    const grantRoundId = grantRoundAddress.toHexString()
    const grantRoundContract = GrantRoundContract.bind(grantRoundAddress)
    const grantRound = GrantRoundSchema.load(grantRoundId)

    // Get RecipientRegistry address from GrantRound contract (trade-off).
    const recipientRegistryAddress = grantRoundContract.recipientRegistry()

    if (grantRound !== null) {
        // Calculate Recipient Registry identifier for Recipient.
        const recipientRegistryId = recipientRegistryAddress.toString()

        // Get Recipient.
        const recipientAddress = event.params._recipient
        const recipientId = recipientAddress.toHexString()
        let recipient = Recipient.load(recipientId)
        const donationId = grantRoundId.concat("-").concat(recipientId)

        // Get the mapping table for GrantRound and Recipient.
        const mappingTableGRRId = grantRoundId.concat("-").concat(recipientId)
        let mappingTableGRR = GrantRoundRecipient.load(mappingTableGRRId)

        if (recipient === null) {
            recipient = new Recipient(recipientId)
        }

        if (mappingTableGRR === null) {
            mappingTableGRR = new GrantRoundRecipient(mappingTableGRRId)
        }

        recipient.address = recipientAddress
        recipient.recipientRegistry = recipientRegistryId
        recipient.rejected = false
        recipient.voteOptionIndex = event.params._voteOptionIndex
        recipient.donations = [donationId]
        recipient.createdAt = timestamp
        recipient.lastUpdatedAt = timestamp

        mappingTableGRR.grantRound = grantRoundId
        mappingTableGRR.recipient = recipientId

        recipient.save()
        mappingTableGRR.save()

        // Create a new Donation entity.
        const donation = new Donation(donationId)

        donation.grantRound = grantRoundId
        donation.recipient = recipientId
        donation.amount = event.params._allocatedAmount
        donation.voteOptionIndex = event.params._voteOptionIndex
        donation.createdAt = event.block.timestamp.toString()

        donation.save()
    } else {
        log.error(`GrantRound entity not found!`, [])
    }
}

/**
 * Handle the publishing of the tally on IPFS.
 * @param event Ethereum event emitted when the tally hash is published on IPFS.
 */
export function handleTallyPublished(event: TallyPublished): void {
    log.debug(`TallyPublished event block: {}`, [event.block.number.toString()])

    const grantRoundId = event.address.toHexString()
    const grantRound = GrantRoundSchema.load(grantRoundId)

    if (grantRound !== null) {
        grantRound.tallyHash = event.params._tallyHash
        grantRound.lastUpdatedAt = event.block.timestamp.toString()

        grantRound.save()
    } else {
        log.error(`GrantRound entity not found!`, [])
    }
}

/**
 * Handle the vote registration when someone publish a message.
 * @param event Ethereum event emitted when someone publish a message to vote in a GrantRound.
 */
export function handleVoted(event: Voted): void {
    log.debug(`Voted event block: {}`, [event.block.number.toString()])

    const grantRoundId = event.address.toHexString()
    const grantRound = GrantRoundSchema.load(grantRoundId)

    if (grantRound !== null) {
        // Get Voter (Contributor).
        const voterAddress = event.params._voter
        const voterId = voterAddress.toHexString()
        const voter = Contributor.load(voterId)

        if (voter !== null) {
            // Create a new Vote.
            const voteId = grantRoundId.concat("-").concat(voterId)
            const vote = new Vote(voteId)

            vote.contributor = voterAddress.toHexString()
            vote.grantRound = grantRoundId

            vote.save()
        } else {
            log.error(`Contributor (Voter) entity not found!`, [])
        }
    } else {
        log.error(`GrantRound entity not found!`, [])
    }
}
