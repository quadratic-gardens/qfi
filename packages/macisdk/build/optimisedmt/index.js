import { utils } from "ethers";
import { OptimisedMT } from "./OptimisedMT";
/*
 * Hash an array of uint256 values the same way that the EVM does.
 */
const hashArray = (input) => {
    const types = [];
    for (let i = 0; i < input.length; i++) {
        types.push("uint256");
    }
    return (BigInt(utils.soliditySha256(types, input.map((x) => x.toString()))) % SNARK_FIELD_SIZE);
};
const SNARK_FIELD_SIZE = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617");
export { hashArray, OptimisedMT };
//# sourceMappingURL=index.js.map