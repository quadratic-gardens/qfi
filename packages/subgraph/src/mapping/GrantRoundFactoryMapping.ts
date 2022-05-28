import { log } from "@graphprotocol/graph-ts"
import {
    OwnershipTransferred,
    MessageAqFactoryChanged,
    RecipientRegistryChanged,
    GrantRoundFactory
} from "../../generated/GrantRoundFactory/GrantRoundFactory"
import { OptimisticRecipientRegistry as RecipientRegistryContract } from "../../generated/OptimisticRecipientRegistry/OptimisticRecipientRegistry"
import { QFI as QFISchema, GrantRound, RecipientRegistry, GrantRoundFactory as GrantRoundFactorySchema } from "../../generated/schema"

/**
 * (e.g., Store a PublicKey in the storage).
 * @param event Ethereum event emitted when XYZ.
 */
export function handleOwnershipTransferred(event: OwnershipTransferred): void {
    log.debug(`OwnershipTransferred event block: {}`, [event.block.number.toString()])
}

/**
 * Handle the change of the MessageAqFactory contract for the GrantRound Factory.
 * @param event Ethereum event emitted when a new MessageAqFactory contract is used by the GrantRound Factory.
 */
export function handleMessageAqFactoryChanged(event: MessageAqFactoryChanged): void {
    log.debug(`MessageAqFactoryChanged event block: {}`, [event.block.number.toString()])

    const timestamp = event.block.timestamp.toString()

    const grantRoundFactoryAddress = event.address
    const grantRoundFactoryId = grantRoundFactoryAddress.toHexString()
    let grantRoundFactory = new GrantRoundFactorySchema(grantRoundFactoryId)

    if (grantRoundFactory !== null) {
        grantRoundFactory.messageAqFactoryAddress = event.params._messageAqFactory
        grantRoundFactory.lastUpdatedAt = timestamp

        grantRoundFactory.save()
    } else {
        log.error(`GrantRoundFactory entity not found!`, [])
    }
}

/**
 * (e.g., Store a PublicKey in the storage).
 * @param event Ethereum event emitted when XYZ.
 */
export function handleRecipientRegistryChanged(event: RecipientRegistryChanged): void {
    log.debug(`RecipientRegistryChanged event block: {}`, [event.block.number.toString()])

    const timestamp = event.block.timestamp.toString()

    // Create/Update Recipient Registry.
    const recipientRegistryAddress = event.params._recipientRegistry
    const recipientRegistryId = recipientRegistryAddress.toHexString()
    let recipientRegistry = RecipientRegistry.load(recipientRegistryId)
    const recipientRegistryContract = RecipientRegistryContract.bind(recipientRegistryAddress)

    // Read from contract (trade-off, only when changing registry. May not be changed for multiple rounds).
    const baseDeposit = recipientRegistryContract.baseDeposit()
    const challengePeriodDuration = recipientRegistryContract.challengePeriodDuration()
    const controller = recipientRegistryContract.controller()
    const maxRecipients = recipientRegistryContract.maxRecipients()

    if (recipientRegistry === null) {
        recipientRegistry = new RecipientRegistry(recipientRegistryId)

        recipientRegistry.grantRoundFactoryAddress = event.address
        recipientRegistry.baseDeposit = baseDeposit
        recipientRegistry.challengePeriodDuration = challengePeriodDuration
        recipientRegistry.controller = controller
        recipientRegistry.maxRecipients = maxRecipients
        recipientRegistry.createdAt = timestamp
        recipientRegistry.lastUpdatedAt = timestamp

        recipientRegistry.save()
    }

    // Update Grant Round Factory entity.
    const grantRoundFactoryAddress = event.address
    const grantRoundFactoryId = grantRoundFactoryAddress.toHexString()
    let grantRoundFactory = GrantRoundFactorySchema.load(grantRoundFactoryId)

    if (grantRoundFactory === null) {
        grantRoundFactory = new GrantRoundFactorySchema(grantRoundFactoryId)

        grantRoundFactory.recipientRegistryAddress = recipientRegistryAddress
        grantRoundFactory.createdAt = timestamp
    } else 
        grantRoundFactory.recipientRegistryAddress = recipientRegistryAddress

    grantRoundFactory.lastUpdatedAt = timestamp
    grantRoundFactory.save()

    // nb. may happen that the TX may not be signed from QFI contract.
    const qfiAddress = event.address
    const qfiId = qfiAddress.toHexString()
    const qfi = new QFISchema(qfiId)

    if (qfi !== null) {
        const grantRoundId = qfi.currentGrantRound

        if (grantRoundId !== null) {
            // Update recipient registry.
            recipientRegistry.grantRound = grantRoundId
            recipientRegistry.save()

            // Update QFI.
            qfi.recipientRegistry = recipientRegistryId
            qfi.lastUpdatedAt = event.block.timestamp.toString()

            qfi.save()

            // Update GrantRound.
            const grantRound = GrantRound.load(grantRoundId)

            if (grantRound !== null) {
                grantRound.recipientRegistry = recipientRegistryId
                grantRound.lastUpdatedAt = timestamp

                grantRound.save()
            } else {
                log.error(`GrantRound entity not found!`, [])
            }
        } else {
            log.info(`QFI current GrantRound not deployed yet!`, [])
        }
    } else {
        log.info(`QFI not initialized yet!`, [])
    }
}
