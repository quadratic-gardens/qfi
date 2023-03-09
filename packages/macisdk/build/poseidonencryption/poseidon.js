import { poseidonPerm } from "./poseidonPerm";
export function poseidon(inputs) {
    return poseidonPerm([0, ...inputs])[0];
}
//# sourceMappingURL=poseidon.js.map