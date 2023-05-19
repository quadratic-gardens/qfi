import {poseidonPerm} from "./poseidonPerm.js";

export function poseidon(inputs) {
    return poseidonPerm([0, ...inputs])[0];
}