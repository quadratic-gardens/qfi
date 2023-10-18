/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IInitialVoiceCreditProxy,
  IInitialVoiceCreditProxyInterface,
} from "../../../contracts/flavors/IInitialVoiceCreditProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "getVoiceCredits",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IInitialVoiceCreditProxy__factory {
  static readonly abi = _abi;
  static createInterface(): IInitialVoiceCreditProxyInterface {
    return new utils.Interface(_abi) as IInitialVoiceCreditProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IInitialVoiceCreditProxy {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IInitialVoiceCreditProxy;
  }
}
