import { log } from '@graphprotocol/graph-ts'
import {
    OwnershipTransferred,
    MessageAqFactoryChanged,
    RecipientRegistryChanged,
} from '../generated/GrantRoundFactory/GrantRoundFactory'
import {
    OptimisticRecipientRegistry as RecipientRegistryContract
} from '../generated/OptimisticRecipientRegistry/OptimisticRecipientRegistry'
import { QFI as QFISchema, GrantRound, PublicKey, Coordinator, Contribution, Contributor, FundingSource, RecipientRegistry } from "../generated/schema"

/**
* (e.g., Store a PublicKey in the storage).
* @param event Ethereum event emitted when XYZ.
*/
export function handleOwnershipTransferred(event: OwnershipTransferred): void { }

/**
* Handle the change of the MessageAqFactory contract for the GrantRound Factory.
* @param event Ethereum event emitted when a new MessageAqFactory contract is used by the GrantRound Factory.
*/
export function handleMessageAqFactoryChanged(event: MessageAqFactoryChanged): void {
    log.debug(`MessageAqFactoryChanged event block: {}`, [event.block.number.toString()])

    // Update QFI.
    const qfiAddress = event.transaction.from
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        qfi.messageAqFactoryGrantRoundAddress = event.params._messageAqFactoryNew
        qfi.lastUpdatedAt = event.block.timestamp.toString()

        qfi.save()

    } else {
        log.error(`QFI entity not found!`, [])
    }
}

/**
* (e.g., Store a PublicKey in the storage).
* @param event Ethereum event emitted when XYZ.
*/
export function handleRecipientRegistryChanged(event: RecipientRegistryChanged): void {
    log.debug(`RecipientRegistryChanged event block: {}`, [event.block.number.toString()])

    const timestamp = event.block.timestamp.toString()
    // Get QFI.
    const qfiAddress = event.transaction.from
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        const recipientRegistryAddress = event.params._recipientRegistryNew
        const recipientRegistryId = recipientRegistryAddress.toHexString()
        const recipientRegistry = RecipientRegistry.load(recipientRegistryId)
        const recipientRegistryContract = RecipientRegistryContract.bind(recipientRegistryAddress)

        // Read from contract (trade-off, only when changing registry. May not be changed for multiple rounds).
        const baseDeposit = recipientRegistryContract.baseDeposit()
        const challengePeriodDuration = recipientRegistryContract.challengePeriodDuration()
        const controller = recipientRegistryContract.controller()
        const maxRecipients = recipientRegistryContract.maxRecipients()

        if (recipientRegistry === null) {
            // Create a new RecipientRegistry.
            const recipientRegistry = new RecipientRegistry(recipientRegistryId)

            recipientRegistry.grantRoundFactoryAddress = event.address
            recipientRegistry.baseDeposit = baseDeposit
            recipientRegistry.challengePeriodDuration = challengePeriodDuration
            recipientRegistry.controller = controller
            recipientRegistry.maxRecipients = maxRecipients
            recipientRegistry.grantRound = qfi.currentGrantRound
            recipientRegistry.createdAt = timestamp
            recipientRegistry.lastUpdatedAt = timestamp

            recipientRegistry.save()
        } else {
            recipientRegistry.grantRoundFactoryAddress = event.address
            recipientRegistry.grantRound = qfi.currentGrantRound
            recipientRegistry.baseDeposit = baseDeposit
            recipientRegistry.challengePeriodDuration = challengePeriodDuration
            recipientRegistry.maxRecipients = maxRecipients
            recipientRegistry.lastUpdatedAt = timestamp

            recipientRegistry.save()
        }

        // Update QFI.
        qfi.recipientRegistry = recipientRegistryId
        qfi.lastUpdatedAt = event.block.timestamp.toString()

        qfi.save()

        // Update GrantRound.
        const grantRound = GrantRound.load(qfi.currentGrantRound)

        if (grantRound !== null) {
            grantRound.recipientRegistry = recipientRegistryId
            grantRound.lastUpdatedAt = timestamp

            grantRound.save()
        } else {
            log.error(`GrantRound entity not found!`, [])
        }

    } else {
        log.error(`QFI entity not found!`, [])
    }}