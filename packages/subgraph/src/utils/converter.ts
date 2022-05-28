import { BigInt } from "@graphprotocol/graph-ts"

// Relates to schema.graphql Stage enum.
export const NOT_INITIALIZED = 'NotInitialized';
export const WAITING_FOR_SIGNUPS_AND_TOPUPS = 'WaitingForSignupsAndTopups';
export const VOTING_PERIOD_OPEN = 'VotingPeriodOpen';
export const WAITING_FOR_FINALIZATION = 'WaitingForFinalization';
export const FINALIZED = 'Finalized';
export const CANCELLED = 'Cancelled';

// Relates to schema.graphql RequestType enum.
export const REGISTRATION = 'Registration';
export const REMOVAL = 'Removal';

/**
 * Current stage value converter.
 * @param _stage <BigInt>: current value to be converted.
 * @returns <string>
 */
export function currentStageConverterFromEnumIndexToString(_stage: string): string {
  if (_stage == "0") {
    return NOT_INITIALIZED;
  } else if (_stage == "1") {
    return WAITING_FOR_SIGNUPS_AND_TOPUPS;
  } else if (_stage == "2") {
    return VOTING_PERIOD_OPEN;
  } else if (_stage == "3") {
    return WAITING_FOR_FINALIZATION
  } else if (_stage == "4") {
    return FINALIZED
  } else if (_stage == "5") {
    return CANCELLED
  }

  throw new Error('Invalid current stage value');
}

/**
 * Request type value converter.
 * @param _requestType <string>: request type to be converted.
 * @returns <string>
 */
export function requestTypeConverterFromEnumIndexToString(_requestType: string): string {
  if (_requestType == "0") {
    return REGISTRATION;
  } else if (_requestType == "1") {
    return REMOVAL;
  }

  throw new Error('Invalid current stage value');
}