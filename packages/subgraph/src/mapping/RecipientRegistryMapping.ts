import { BigInt, log } from "@graphprotocol/graph-ts"
import {
    OwnershipTransferred,
    RequestResolved,
    RequestSubmitted
} from "../../generated/OptimisticRecipientRegistry/OptimisticRecipientRegistry"

import { Recipient } from "../../generated/schema"

/**
 * (e.g., Store a PublicKey in the storage).
 * @param event Ethereum event emitted when XYZ.
 */
export function handleOwnershipTransferred(event: OwnershipTransferred): void {
    log.debug(`OwnershipTransferred event block: {}`, [event.block.number.toString()])
}

/**
 * Store a registration/removal request for a Recipient.
 * @param event Ethereum event emitted when someone make a registration/removal request for a Recipient.
 */
export function handleRequestSubmitted(event: RequestSubmitted): void {
    log.debug(`RequestSubmitted event block: {}`, [event.block.number.toString()])

    const recipientRegistryId = event.address.toHexString()
    const timestamp = event.block.timestamp.toString()

    // Create a new Recipient.
    const recipientId = event.params._recipientId.toHexString()
    const recipient = new Recipient(recipientId)

    recipient.address = event.params._recipient
    recipient.requestType = BigInt.fromI32(event.params._type).toString()
    recipient.requesterAddress = event.transaction.from
    recipient.submissionTime = event.params._timestamp
    recipient.deposit = event.transaction.value
    recipient.metadata = event.params._metadata
    recipient.recipientRegistry = recipientRegistryId
    recipient.requestSubmittedHash = event.transaction.hash
    recipient.createdAt = timestamp
    recipient.lastUpdatedAt = timestamp

    recipient.save()
}

/**
 * Handle the request resolution for a Recipient.
 * @param event Ethereum event emitted when the request for a Recipient is resolved.
 */

export function handleRequestResolved(event: RequestResolved): void {
    log.debug(`RequestResolved event block: {}`, [event.block.number.toString()])

    // Calculate the RecipientRegistry identifier.
    const recipientRegistryId = event.address.toHexString()
    const recipientId = event.params._recipientId.toHexString()
    const recipient = Recipient.load(recipientId)

    if (recipient !== null) {
        recipient.requestType = BigInt.fromI32(event.params._type).toString()
        recipient.requesterAddress = event.transaction.from
        recipient.submissionTime = event.params._timestamp
        recipient.deposit = event.transaction.value
        recipient.recipientRegistry = recipientRegistryId
        recipient.requestResolvedHash = event.transaction.hash
        recipient.rejected = event.params._rejected

        if (event.params._recipientIndex != BigInt.fromI32(0)) {
            if (BigInt.fromI32(event.params._type).toString() == "Registration")
                recipient.addedAt = event.params._recipientIndex
            else recipient.removedAt = event.params._recipientIndex
        }

        recipient.save()
    }
    {
        log.error(`Recipient entity not found!`, [])
    }
}
