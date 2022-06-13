/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "BaseERC20Token",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaseERC20Token__factory>;
    getContractFactory(
      name: "FundsManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FundsManager__factory>;
    getContractFactory(
      name: "GrantRound",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GrantRound__factory>;
    getContractFactory(
      name: "GrantRoundFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GrantRoundFactory__factory>;
    getContractFactory(
      name: "InitialVoiceCreditProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.InitialVoiceCreditProxy__factory>;
    getContractFactory(
      name: "SimpleHackathon",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SimpleHackathon__factory>;
    getContractFactory(
      name: "QFI",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.QFI__factory>;
    getContractFactory(
      name: "BaseRecipientRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaseRecipientRegistry__factory>;
    getContractFactory(
      name: "IRecipientRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRecipientRegistry__factory>;
    getContractFactory(
      name: "OptimisticRecipientRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OptimisticRecipientRegistry__factory>;
    getContractFactory(
      name: "SimpleRecipientRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SimpleRecipientRegistry__factory>;
    getContractFactory(
      name: "Hasher",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Hasher__factory>;
    getContractFactory(
      name: "PoseidonT3",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PoseidonT3__factory>;
    getContractFactory(
      name: "PoseidonT4",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PoseidonT4__factory>;
    getContractFactory(
      name: "PoseidonT5",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PoseidonT5__factory>;
    getContractFactory(
      name: "PoseidonT6",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PoseidonT6__factory>;
    getContractFactory(
      name: "IVerifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVerifier__factory>;
    getContractFactory(
      name: "MockVerifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockVerifier__factory>;
    getContractFactory(
      name: "Verifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Verifier__factory>;
    getContractFactory(
      name: "DomainObjs",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DomainObjs__factory>;
    getContractFactory(
      name: "FreeForAllGatekeeper",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FreeForAllGatekeeper__factory>;
    getContractFactory(
      name: "SignUpGatekeeper",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SignUpGatekeeper__factory>;
    getContractFactory(
      name: "IMACI",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IMACI__factory>;
    getContractFactory(
      name: "ConstantInitialVoiceCreditProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConstantInitialVoiceCreditProxy__factory>;
    getContractFactory(
      name: "InitialVoiceCreditProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.InitialVoiceCreditProxy__factory>;
    getContractFactory(
      name: "InitialVoiceCreditProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.InitialVoiceCreditProxy__factory>;
    getContractFactory(
      name: "MACI",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MACI__factory>;
    getContractFactory(
      name: "MessageAqFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MessageAqFactory__factory>;
    getContractFactory(
      name: "Poll",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Poll__factory>;
    getContractFactory(
      name: "PollFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PollFactory__factory>;
    getContractFactory(
      name: "PollProcessorAndTallyer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PollProcessorAndTallyer__factory>;
    getContractFactory(
      name: "AccQueue",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccQueue__factory>;
    getContractFactory(
      name: "AccQueueBinary",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccQueueBinary__factory>;
    getContractFactory(
      name: "AccQueueBinary0",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccQueueBinary0__factory>;
    getContractFactory(
      name: "AccQueueBinaryMaci",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccQueueBinaryMaci__factory>;
    getContractFactory(
      name: "AccQueueQuinary",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccQueueQuinary__factory>;
    getContractFactory(
      name: "AccQueueQuinary0",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccQueueQuinary0__factory>;
    getContractFactory(
      name: "AccQueueQuinaryBlankSl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccQueueQuinaryBlankSl__factory>;
    getContractFactory(
      name: "AccQueueQuinaryMaci",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccQueueQuinaryMaci__factory>;
    getContractFactory(
      name: "VkRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VkRegistry__factory>;
    getContractFactory(
      name: "PoseidonT3",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PoseidonT3__factory>;
    getContractFactory(
      name: "PoseidonT4",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PoseidonT4__factory>;
    getContractFactory(
      name: "PoseidonT5",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PoseidonT5__factory>;
    getContractFactory(
      name: "PoseidonT6",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PoseidonT6__factory>;

    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "BaseERC20Token",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BaseERC20Token>;
    getContractAt(
      name: "FundsManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FundsManager>;
    getContractAt(
      name: "GrantRound",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GrantRound>;
    getContractAt(
      name: "GrantRoundFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GrantRoundFactory>;
    getContractAt(
      name: "InitialVoiceCreditProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.InitialVoiceCreditProxy>;
    getContractAt(
      name: "SimpleHackathon",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SimpleHackathon>;
    getContractAt(
      name: "QFI",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.QFI>;
    getContractAt(
      name: "BaseRecipientRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BaseRecipientRegistry>;
    getContractAt(
      name: "IRecipientRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRecipientRegistry>;
    getContractAt(
      name: "OptimisticRecipientRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OptimisticRecipientRegistry>;
    getContractAt(
      name: "SimpleRecipientRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SimpleRecipientRegistry>;
    getContractAt(
      name: "Hasher",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Hasher>;
    getContractAt(
      name: "PoseidonT3",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PoseidonT3>;
    getContractAt(
      name: "PoseidonT4",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PoseidonT4>;
    getContractAt(
      name: "PoseidonT5",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PoseidonT5>;
    getContractAt(
      name: "PoseidonT6",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PoseidonT6>;
    getContractAt(
      name: "IVerifier",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IVerifier>;
    getContractAt(
      name: "MockVerifier",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockVerifier>;
    getContractAt(
      name: "Verifier",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Verifier>;
    getContractAt(
      name: "DomainObjs",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DomainObjs>;
    getContractAt(
      name: "FreeForAllGatekeeper",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FreeForAllGatekeeper>;
    getContractAt(
      name: "SignUpGatekeeper",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SignUpGatekeeper>;
    getContractAt(
      name: "IMACI",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IMACI>;
    getContractAt(
      name: "ConstantInitialVoiceCreditProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ConstantInitialVoiceCreditProxy>;
    getContractAt(
      name: "InitialVoiceCreditProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.InitialVoiceCreditProxy>;
    getContractAt(
      name: "InitialVoiceCreditProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.InitialVoiceCreditProxy>;
    getContractAt(
      name: "MACI",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MACI>;
    getContractAt(
      name: "MessageAqFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MessageAqFactory>;
    getContractAt(
      name: "Poll",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Poll>;
    getContractAt(
      name: "PollFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PollFactory>;
    getContractAt(
      name: "PollProcessorAndTallyer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PollProcessorAndTallyer>;
    getContractAt(
      name: "AccQueue",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccQueue>;
    getContractAt(
      name: "AccQueueBinary",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccQueueBinary>;
    getContractAt(
      name: "AccQueueBinary0",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccQueueBinary0>;
    getContractAt(
      name: "AccQueueBinaryMaci",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccQueueBinaryMaci>;
    getContractAt(
      name: "AccQueueQuinary",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccQueueQuinary>;
    getContractAt(
      name: "AccQueueQuinary0",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccQueueQuinary0>;
    getContractAt(
      name: "AccQueueQuinaryBlankSl",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccQueueQuinaryBlankSl>;
    getContractAt(
      name: "AccQueueQuinaryMaci",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccQueueQuinaryMaci>;
    getContractAt(
      name: "VkRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VkRegistry>;
    getContractAt(
      name: "PoseidonT3",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PoseidonT3>;
    getContractAt(
      name: "PoseidonT4",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PoseidonT4>;
    getContractAt(
      name: "PoseidonT5",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PoseidonT5>;
    getContractAt(
      name: "PoseidonT6",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PoseidonT6>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
