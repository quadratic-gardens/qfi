import { BigInt, log, store } from "@graphprotocol/graph-ts"

// Relates to schema.graphql Stage enum.
export const NOT_INITIALIZED = 'NotInitialized';
export const WAITING_FOR_SIGNUPS_AND_TOPUPS = 'WaitingForSignupsAndTopups';
export const VOTING_PERIOD_OPEN = 'VotingPeriodOpen';
export const WAITING_FOR_FINALIZATION = 'WaitingForFinalization';
export const FINALIZED = 'Finalized';
export const CANCELLED = 'Cancelled';

/**
 * Current stage value converter.
 * @param _stage <BigInt>: current value to be converted from BigInt to String.
 * @returns <string>
 */
export function currentStageConverter(_stage: BigInt): string {
  let stage = _stage.toI32()

  switch (stage) {
    case 0: return NOT_INITIALIZED
    case 1: return WAITING_FOR_SIGNUPS_AND_TOPUPS
    case 2: return VOTING_PERIOD_OPEN
    case 3: return WAITING_FOR_FINALIZATION
    case 4: return FINALIZED
    case 5: return CANCELLED
    default: throw new Error('Invalid current stage value');
  }
}