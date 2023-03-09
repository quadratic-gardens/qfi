import { poseidon } from "circomlibjs";
import { utils as ffutils } from "ffjavascript";
const assert = (condition) => {
    if (!condition) {
        throw new Error("Assertion failed");
    }
};
const assertPathElements = (condition) => {
    if (condition.length === 0) {
        throw new Error("Assertion failed");
    }
};
const assertPathElement = (condition) => {
    if (condition.length === 0) {
        throw new Error("Assertion failed");
    }
};
const assertIndices = (condition) => {
    if (condition.length === 0) {
        throw new Error("Assertion failed");
    }
};
const stringifyBigInts = ffutils.stringifyBigInts;
const unstringifyBigInts = ffutils.unstringifyBigInts;
const deepCopyBigIntArray = (arr) => {
    return arr.map((x) => BigInt(x.toString()));
};
const calcInitialVals = (leavesPerNode, depth, zeroValue, hashFunc) => {
    const zeros = [];
    let currentLevelHash = zeroValue;
    for (let i = 0; i < depth; i++) {
        zeros.push(currentLevelHash);
        const z = [];
        for (let j = 0; j < leavesPerNode; j++) {
            z.push(zeros[i]);
        }
        currentLevelHash = hashFunc(z);
    }
    const root = currentLevelHash;
    return { zeros, root };
};
class OptimisedMT {
    depth;
    zeroValue;
    leavesPerNode;
    hashFunc;
    // The the smallest empty leaf index
    nextIndex = 0;
    // Contains the zero value per level. i.e. zeros[0] is zeroValue,
    // zeros[1] is the hash of leavesPerNode zeros, and so on.
    zeros = [];
    root;
    nodes;
    numNodes;
    capacity;
    constructor(_depth, _zeroValue, _leavesPerNode, _hashFunc) {
        this.depth = _depth;
        this.zeroValue = _zeroValue;
        this.leavesPerNode = _leavesPerNode;
        this.hashFunc = _hashFunc;
        const r = calcInitialVals(this.leavesPerNode, this.depth, this.zeroValue, this.hashFunc);
        this.zeros = r.zeros;
        this.root = r.root;
        let numNodes = 1;
        for (let i = 0; i < this.depth; i++) {
            numNodes += this.leavesPerNode ** (i + 1);
        }
        this.numNodes = numNodes;
        const rootIndex = numNodes - 1;
        this.nodes = {};
        this.nodes[rootIndex] = r.root;
        this.capacity = this.leavesPerNode ** this.depth;
    }
    /*
     * Insert a leaf into the Merkle tree
     * @param _value The value to insert. This may or may not already be
     *               hashed.
     */
    insert(_value) {
        this.update(this.nextIndex, _value);
        this.nextIndex++;
    }
    update(_index, _value) {
        // Ensure that _value is a BigInt
        _value = _value;
        // Set the leaf value
        this.setNode(_index, _value);
        // Set the parent leaf value
        // Get the parent indices
        const parentIndices = this.getParentIndices(_index);
        for (const parentIndex of parentIndices) {
            const childIndices = this.getChildIndices(parentIndex);
            const elements = [];
            for (const childIndex of childIndices) {
                elements.push(this.getNode(childIndex));
            }
            this.nodes[parentIndex] = this.hashFunc(elements);
        }
        this.root = this.nodes[this.numNodes - 1];
    }
    /*
     *  Generates a Merkle proof from a leaf to the root.
     */
    genMerklePath(_index) {
        if (_index < 0) {
            throw new Error("The leaf index must be greater than 0");
        }
        if (_index >= this.leavesPerNode ** this.depth) {
            throw new Error("The leaf index is too large");
        }
        const pathElements = [];
        const indices = [_index % this.leavesPerNode];
        let r = Math.floor(_index / this.leavesPerNode);
        // Generate indices
        for (let i = 0; i < this.depth; i++) {
            const p = r % this.leavesPerNode;
            if (i < this.depth - 1) {
                indices.push(p);
            }
            r = Math.floor(r / this.leavesPerNode);
        }
        // Generate path elements
        let leafIndex = _index;
        let offset = 0;
        for (let i = 0; i < this.depth; i++) {
            const elements = [];
            const index = indices[i];
            const start = leafIndex - (leafIndex % this.leavesPerNode) + offset;
            for (let i = 0; i < this.leavesPerNode; i++) {
                if (i !== index) {
                    elements.push(this.getNode(start + i));
                }
            }
            pathElements.push(elements);
            leafIndex = Math.floor(leafIndex / this.leavesPerNode);
            offset += this.leavesPerNode ** (this.depth - i);
        }
        return {
            pathElements,
            indices,
            depth: this.depth,
            root: this.root,
            leaf: this.getNode(_index),
        };
    }
    /*
     * Generates a Merkle proof from a subroot to the root.
     */
    genMerkleSubrootPath(_startIndex, // inclusive
    _endIndex // exclusive
    ) {
        // The end index must be greater than the start index
        assert(_endIndex > _startIndex);
        const numLeaves = _endIndex - _startIndex;
        // The number of leaves must be a multiple of the tree arity
        assert(numLeaves % this.leavesPerNode === 0);
        // The number of leaves must be lower than the maximum tree capacity
        assert(numLeaves < this.leavesPerNode ** this.depth);
        // The number of leaves must the tree arity raised to some positive integer
        let f = false;
        let subDepth;
        for (let i = 0; i < this.depth; i++) {
            if (numLeaves === this.leavesPerNode ** i) {
                subDepth = i;
                f = true;
                break;
            }
        }
        assert(f);
        assert(subDepth < this.depth);
        const subTree = new OptimisedMT(subDepth, this.zeroValue, this.leavesPerNode, this.hashFunc);
        for (let i = _startIndex; i < _endIndex; i++) {
            subTree.insert(this.getNode(i));
        }
        const fullPath = this.genMerklePath(_startIndex);
        fullPath.depth = this.depth - subDepth;
        fullPath.indices = fullPath.indices.slice(subDepth, this.depth);
        fullPath.pathElements = fullPath.pathElements.slice(subDepth, this.depth);
        fullPath.leaf = subTree.root;
        return fullPath;
    }
    static verifyMerklePath = (_proof, _hashFunc) => {
        assertPathElements(_proof.pathElements);
        //TODO: assert flubbed
        const pathElements = _proof.pathElements;
        // Validate the proof format
        assertIndices(_proof.indices);
        for (let i = 0; i < _proof.depth; i++) {
            assertPathElement(pathElements[i]);
            assert(_proof.indices[i] != undefined);
        }
        // Hash the first level
        const firstLevel = pathElements[0];
        firstLevel.splice(Number(_proof.indices[0]), 0, _proof.leaf);
        let currentLevelHash = _hashFunc(firstLevel);
        // Verify the proof
        for (let i = 1; i < pathElements.length; i++) {
            const level = pathElements[i];
            level.splice(Number(_proof.indices[i]), 0, currentLevelHash);
            currentLevelHash = _hashFunc(level);
        }
        return currentLevelHash === _proof.root;
    };
    getLeaf(_index) {
        assert(_index < this.capacity);
        return this.getNode(_index);
    }
    getNode(_index) {
        assert(_index <= this.numNodes - 1);
        if (this.nodes[_index] != undefined) {
            return this.nodes[_index];
        }
        else {
            let r = 0;
            let level = this.depth;
            while (true) {
                r += this.leavesPerNode ** level;
                if (_index < r) {
                    break;
                }
                level--;
            }
            return this.zeros[this.depth - level];
        }
    }
    setNode(_index, _value) {
        assert(_index <= this.numNodes - 1);
        this.nodes[_index] = _value;
    }
    getChildIndices(_index) {
        return OptimisedMT.calcChildIndices(_index, this.leavesPerNode, this.depth);
    }
    static calcChildIndices(_index, _leavesPerNode, _depth) {
        // The node must be a parent
        assert(_index >= _leavesPerNode ** _depth);
        // Determine which level the node is at
        let level = 0;
        let r = _leavesPerNode ** level;
        while (true) {
            if (_index < r) {
                break;
            }
            level++;
            r += _leavesPerNode ** level;
        }
        const start = (_index - _leavesPerNode ** level) * _leavesPerNode;
        const indices = [start];
        for (let i = 0; i < _leavesPerNode - 1; i++) {
            indices.push(start + i + 1);
        }
        return indices;
    }
    getParentIndices(_index) {
        return OptimisedMT.calcParentIndices(_index, this.leavesPerNode, this.depth);
    }
    static calcParentIndices(_index, _leavesPerNode, _depth) {
        assert(_depth > 0);
        assert(_leavesPerNode > 1);
        // The index must be of a leaf
        const treeCapacity = _leavesPerNode ** _depth;
        assert(_index < treeCapacity);
        const indices = [];
        let levelCapacity = 0;
        let r = _index;
        for (let i = 0; i < _depth; i++) {
            levelCapacity += _leavesPerNode ** (_depth - i);
            r = Math.floor(r / _leavesPerNode);
            const levelIndex = levelCapacity + r;
            indices.push(levelIndex);
        }
        return indices;
    }
    /*
     *  Deep-copies this object
     */
    copy() {
        const newTree = new OptimisedMT(this.depth, this.zeroValue, this.leavesPerNode, this.hashFunc);
        newTree.nodes = JSON.parse(JSON.stringify(stringifyBigInts(this.nodes)));
        newTree.numNodes = this.numNodes;
        newTree.nextIndex = this.nextIndex;
        newTree.zeros = deepCopyBigIntArray(this.zeros);
        newTree.root = this.root;
        newTree.nextIndex = this.nextIndex;
        return newTree;
    }
    serialize = () => {
        return JSON.stringify(stringifyBigInts({
            leavesPerNode: this.leavesPerNode,
            depth: this.depth,
            zeroValue: this.zeroValue,
            root: this.root,
            nextIndex: this.nextIndex,
            nodes: this.nodes,
            numNodes: this.numNodes,
            zeros: this.zeros,
        }));
    };
    equals = (o) => {
        return this.serialize() === o.serialize();
    };
    static unserialize = (s) => {
        const d = unstringifyBigInts(JSON.parse(s));
        const tree = new OptimisedMT(d.depth, d.zeroValue, d.leavesPerNode, poseidon);
        tree.root = d.root;
        tree.nextIndex = d.nextIndex;
        tree.nodes = d.nodes;
        tree.numNodes = d.numNodes;
        tree.zeros = d.zeros;
        return tree;
    };
}
/*
 * Calculate a Merkle root given a list of leaves
 */
const calculateRoot = (leaves, arity, hashFunc) => {
    if (leaves.length === 1) {
        return leaves[0];
    }
    assert(leaves.length % arity === 0);
    const hashes = [];
    for (let i = 0; i < leaves.length / arity; i++) {
        const r = [];
        for (let j = 0; j < arity; j++) {
            r.push(leaves[i * arity + j]);
        }
        hashes.push(hashFunc(r));
    }
    return calculateRoot(hashes, arity, hashFunc);
};
export { OptimisedMT, calculateRoot, calcInitialVals };
//const _insert = (
//depth: number,
//leavesPerNode: number,
//nextIndex: number,
//value: BigInt,
//filledSubtrees: BigInt[][],
//filledPaths: any,
//leaves: BigInt[],
//zeros: BigInt[],
//hashFunc: (leaves: BigInt[]) => BigInt,
//) => {
//let m = nextIndex % leavesPerNode
//filledSubtrees[0][m] = value
//let currentIndex = nextIndex
//for (let i = 1; i < depth; i++) {
//// currentIndex is the leaf or node's absolute index
//currentIndex = Math.floor(currentIndex / leavesPerNode)
//// m is the leaf's relative position within its node
//m = currentIndex % leavesPerNode
//if (m === 0) {
//// Zero out the level
//for (let j = 1; j < filledSubtrees[i].length; j ++) {
//filledSubtrees[i][j] = zeros[i]
//}
//}
//const z = filledSubtrees[i - 1]
//const hashed = hashFunc(z)
//filledSubtrees[i][m] = hashed
//if (filledPaths[i - 1].length <= currentIndex) {
//filledPaths[i - 1].push(hashed)
//} else {
//filledPaths[i - 1][currentIndex] = hashed
//}
//}
//leaves.push(value)
//}
//const _genMerklePath = (
//_index: number,
//leavesPerNode: number,
//depth: number,
//leaves: BigInt[],
//zeros: BigInt[],
//filledPaths: any,
//root: BigInt,
//): MerkleProof => {
//if (_index < 0) {
//throw new Error('The leaf index must be greater than 0')
//}
//if (_index >= leaves.length) {
//throw new Error('The leaf index is too large')
//}
//const pathElements: BigInt[][] = []
//const indices: number[] = [_index % leavesPerNode]
//let r = Math.floor(_index / leavesPerNode)
//for (let i = 0; i < depth; i ++) {
//const s: BigInt[] = []
//if (i === 0) {
//// Get a slice of leaves, padded with zeros
//const leafStartIndex = _index - (_index % leavesPerNode)
//const leafEndIndex = leafStartIndex + leavesPerNode
//for (let j = leafStartIndex; j < leafEndIndex; j ++) {
//if (j < leaves.length) {
//s.push(leaves[j])
//} else {
//s.push(zeros[i])
//}
//}
//} else {
//for (let j = 0; j < leavesPerNode; j ++) {
//const x = r * leavesPerNode + j
//if (filledPaths[i - 1].length <= x) {
//s.push(zeros[i])
//} else {
//const e = filledPaths[i - 1][x]
//s.push(e)
//}
//}
//}
//const p = r % leavesPerNode
//pathElements.push(s)
//if (i < depth - 1) {
//indices.push(p)
//}
//r = Math.floor(r /leavesPerNode)
//}
//// Remove the commitments to elements which are the leaves per level
//const newPe: BigInt[][] = [[]]
//const firstIndex = _index % leavesPerNode
//for (let i = 0; i < pathElements[0].length; i ++) {
//if (i !== firstIndex) {
//newPe[0].push(pathElements[0][i])
//}
//}
//for (let i = 1; i < pathElements.length; i ++) {
//const level: BigInt[] = []
//for (let j = 0; j < pathElements[i].length; j ++) {
//if (j !== indices[i]) {
//level.push(pathElements[i][j])
//}
//}
//newPe.push(level)
//}
//return {
//pathElements: newPe,
//indices,
//depth: depth,
//root,
//leaf: leaves[_index],
//}
//}
//const _genMerkleSubrootPath = (
//_startIndex: number, // inclusive
//_endIndex: number, // exclusive
//leavesPerNode: number,
//depth: number,
//zeroValue: BigInt,
//leaves: BigInt[],
//zeros: BigInt[],
//filledSubtrees: BigInt[][],
//filledPaths: any,
//root: BigInt,
//hashFunc: (leaves: BigInt[]) => BigInt,
//): MerkleProof => {
//// The end index must be greater than the start index
//assert(_endIndex > _startIndex)
//const numLeaves = _endIndex - _startIndex
//// The number of leaves must be a multiple of the tree arity
//assert(numLeaves % leavesPerNode === 0)
//// The number of leaves must be lower than the maximum tree capacity
//assert(numLeaves < leavesPerNode ** depth)
//// The number of leaves must the tree arity raised to some positive integer
//let f = false
//let subDepth
//for (let i = 0; i < depth; i ++) {
//if (numLeaves === leavesPerNode ** i) {
//subDepth = i
//f = true
//break
//}
//}
//assert(f)
//assert(subDepth < depth)
//const leaf = calculateRoot(
//leaves.slice(_startIndex, _endIndex),
//leavesPerNode,
//hashFunc,
//)
//const fullPath = _genMerklePath(
//_startIndex,
//leavesPerNode,
//depth,
//leaves,
//zeros,
//filledPaths,
//root,
//)
//fullPath.depth = depth - subDepth
//fullPath.indices = fullPath.indices.slice(subDepth, depth)
//fullPath.pathElements = fullPath.pathElements.slice(subDepth, depth)
//fullPath.leaf = leaf
//return fullPath
//}
//const _verifyMerklePath = (
//_proof: MerkleProof,
//_hashFunc: (leaves: BigInt[]) => BigInt,
//) => {
//assert (_proof.pathElements)
//const pathElements = _proof.pathElements
//// Validate the proof format
//assert (_proof.indices)
//for (let i = 0; i < _proof.depth; i ++) {
//assert(pathElements[i])
//assert(_proof.indices[i] != undefined)
//}
//// Hash the first level
//const firstLevel: BigInt[] = pathElements[0].map(BigInt)
//firstLevel.splice(Number(_proof.indices[0]), 0, _proof.leaf)
//let currentLevelHash: BigInt = _hashFunc(firstLevel)
//// Verify the proof
//for (let i = 1; i < pathElements.length; i ++) {
//const level: BigInt[] = pathElements[i].map(BigInt)
//level.splice(Number(_proof.indices[i]), 0, currentLevelHash)
//currentLevelHash = _hashFunc(level)
//}
//return currentLevelHash === _proof.root
//}
/*
 * An incremental Merkle tree.
 */
//class IncrementalTree {
//// The number of leaves per node
//public leavesPerNode: number
//// The tree depth
//public depth: number
//// The default value for empty leaves
//public zeroValue: BigInt
//// The tree root
//public root: BigInt
//// The the smallest empty leaf index
//public nextIndex: number
//// All leaves in the tree
//public leaves: Leaf[] = []
//// Contains the zero value per level. i.e. zeros[0] is zeroValue,
//// zeros[1] is the hash of leavesPerNode zeros, and so on.
//public zeros: BigInt[] = []
//// Caches values needed for efficient appends.
//public filledSubtrees: BigInt[][] = []
//// Caches values needed to compute Merkle paths.
//public filledPaths: any = {}
//// The hash function to use
//public hashFunc: (leaves: BigInt[]) => BigInt
//constructor (
//_depth: number,
//_zeroValue: BigInt | number,
//_leavesPerNode: number,
//_hashFunc: (leaves: BigInt[]) => BigInt
//) {
//this.leavesPerNode = Number(_leavesPerNode)
//this.depth = Number(_depth)
//assert(this.depth > 0)
//this.nextIndex = 0
//this.zeroValue = BigInt(_zeroValue)
//this.hashFunc = _hashFunc
//const r = calcInitialVals(
//this.leavesPerNode,
//this.depth,
//this.zeroValue,
//this.hashFunc,
//)
//this.filledSubtrees = r.filledSubtrees
//this.filledPaths = r.filledPaths
//this.zeros = r.zeros
//this.root = r.root
//}
/*
 * Insert a leaf into the Merkle tree
 * @param _value The value to insert. This may or may not already be
 *               hashed.
 */
//public insert(
//_value: Leaf,
//) {
//// Ensure that _value is a BigInt
//_value = BigInt(_value)
//// A node is one level above the leaf
//// m is the leaf's relative position within its node
//let m = this.nextIndex % this.leavesPerNode
//if (m === 0) {
//// Zero out the level in filledSubtrees
//for (let j = 1; j < this.filledSubtrees[0].length; j ++) {
//this.filledSubtrees[0][j] = this.zeros[0]
//}
//}
//_insert(
//this.depth,
//this.leavesPerNode,
//this.nextIndex,
//_value,
//this.filledSubtrees,
//this.filledPaths,
//this.leaves,
//this.zeros,
//this.hashFunc,
//)
//this.nextIndex ++
//this.root = this.hashFunc(
//this.filledSubtrees[this.filledSubtrees.length - 1],
//)
//}
/*
 * Update the leaf at the specified index with the given value.
 */
//public update(
//_index: number,
//_value: Leaf,
//) {
//if (_index >= this.nextIndex || _index >= this.leaves.length) {
//throw new Error('The leaf index specified is too large')
//}
//_value = BigInt(_value)
//const temp = this.leaves
//temp[_index] = _value
//this.leaves[_index] = _value
//const newTree = new IncrementalTree(
//this.depth,
//this.zeroValue,
//this.leavesPerNode,
//this.hashFunc,
//)
//for (let i = 0; i < temp.length; i++) {
//newTree.insert(temp[i])
//}
//this.leaves = newTree.leaves
//this.zeros = newTree.zeros
//this.filledSubtrees = newTree.filledSubtrees
//this.filledPaths = newTree.filledPaths
//this.root = newTree.root
//this.nextIndex = newTree.nextIndex
//}
/*
 * Returns the leaf value at the given index
 */
//public getLeaf(_index: number): Leaf {
//return this.leaves[_index]
//}
/*
 * Generates a Merkle proof from a subroot to the root.
 */
//public genMerkleSubrootPath(
//_startIndex: number, // inclusive
//_endIndex: number, // exclusive
//): MerkleProof {
//return _genMerkleSubrootPath(
//_startIndex,
//_endIndex,
//this.leavesPerNode,
//this.depth,
//this.zeroValue,
//this.leaves,
//this.zeros,
//this.filledSubtrees,
//this.filledPaths,
//this.root,
//this.hashFunc,
//)
//}
/*  Generates a Merkle proof from a leaf to the root.
 */
//public genMerklePath(_index: number): MerkleProof {
//return _genMerklePath(
//_index,
//this.leavesPerNode,
//this.depth,
//this.leaves,
//this.zeros,
//this.filledPaths,
//this.root,
//)
//}
/*
 * Return true if the given Merkle path is valid, and false otherwise.
 */
//public static verifyMerklePath(
//_proof: MerkleProof,
//_hashFunc: (leaves: BigInt[]) => BigInt,
//): boolean {
//return _verifyMerklePath( _proof, _hashFunc)
//}
/*  Deep-copies this object
 */
//public copy(): IncrementalTree {
//const newTree = new IncrementalTree(
//this.depth,
//this.zeroValue,
//this.leavesPerNode,
//this.hashFunc,
//)
//newTree.leaves = deepCopyBigIntArray(this.leaves)
//newTree.zeros = deepCopyBigIntArray(this.zeros)
//newTree.root = this.root
//newTree.nextIndex = this.nextIndex
//newTree.filledSubtrees = this.filledSubtrees.map(deepCopyBigIntArray)
//newTree.filledPaths = unstringifyBigInts(JSON.parse(
//JSON.stringify(stringifyBigInts(this.filledPaths))
//))
//return newTree
//}
//public equals(t: IncrementalTree): boolean {
//const eq =
//this.depth === t.depth &&
//this.zeroValue === t.zeroValue &&
//this.leavesPerNode === t.leavesPerNode &&
//this.root === t.root &&
//this.nextIndex === t.nextIndex &&
//this.leaves.length === t.leaves.length &&
//this.filledSubtrees.length === t.filledSubtrees.length
//this.filledPaths.length === t.filledPaths.length
//if (!eq) { return false }
//for (let i = 0; i < this.leaves.length; i ++) {
//if (this.leaves[i] !== t.leaves[i]) {
//return false
//}
//}
//return true
//}
//}
/*
 * Multiple incremental Merkle tree. When a tree is full, the next insertion
 * goes into a new tree.
 */
//class MultiIncrementalTree {
//// The number of leaves per node
//public leavesPerNode: number
//// The tree depth
//public depth: number
//// The default value for empty leaves
//public zeroValue: BigInt
//public currentTreeNum = 0
//// The tree roots
//public roots: BigInt[]
//// The the smallest empty leaf index
//public nextIndex: number
//// All leaves in the tree
//public leaves: Leaf[] = []
//// Contains the zero value per level. i.e. zeros[0] is zeroValue,
//// zeros[1] is the hash of leavesPerNode zeros, and so on.
//public zeros: BigInt[] = []
//// Caches values needed for efficient appends.
//public filledSubtrees: BigInt[][][] = []
//// Caches values needed to compute Merkle paths.
//public filledPaths: any[] = []
//// The hash function to use
//public hashFunc: (leaves: BigInt[]) => BigInt
//constructor (
//_depth: number,
//_zeroValue: BigInt | number,
//_leavesPerNode: number,
//_hashFunc: (leaves: BigInt[]) => BigInt
//) {
//this.leavesPerNode = Number(_leavesPerNode)
//this.depth = Number(_depth)
//assert(this.depth > 0)
//this.nextIndex = 0
//this.zeroValue = BigInt(_zeroValue)
//this.hashFunc = _hashFunc
//const r = calcInitialVals(
//this.leavesPerNode,
//this.depth,
//this.zeroValue,
//this.hashFunc,
//)
//this.zeros = r.zeros
//this.filledSubtrees = [r.filledSubtrees]
//this.filledPaths = [r.filledPaths]
//this.roots = [r.root]
//}
/*
 * Insert a leaf into the Merkle tree
 * @param _value The value to insert. This may or may not already be
 *               hashed.
 */
//public insert(
//_value: Leaf,
//) {
//if (this.nextIndex >= this.leavesPerNode ** this.depth) {
//this.nextIndex = 0
//this.currentTreeNum ++
//const r = calcInitialVals(
//this.leavesPerNode,
//this.depth,
//this.zeroValue,
//this.hashFunc,
//)
//this.zeros = r.zeros
//this.filledSubtrees.push(r.filledSubtrees)
//this.filledPaths.push(r.filledPaths)
//this.roots.push(r.root)
//}
//// Ensure that _value is a BigInt
//_value = BigInt(_value)
//// A node is one level above the leaf
//// m is the leaf's relative position within its node
//let m = this.nextIndex % this.leavesPerNode
//if (m === 0) {
//// Zero out the level in filledSubtrees
//for (let j = 1; j < this.leavesPerNode; j ++) {
//this.filledSubtrees[this.currentTreeNum][0][j] = this.zeros[0]
//}
//}
//_insert(
//this.depth,
//this.leavesPerNode,
//this.nextIndex,
//_value,
//this.filledSubtrees[this.currentTreeNum],
//this.filledPaths[this.currentTreeNum],
//this.leaves,
//this.zeros,
//this.hashFunc,
//)
//this.nextIndex ++
//this.roots[this.currentTreeNum] = this.hashFunc(
//this.filledSubtrees[this.currentTreeNum][this.filledSubtrees[this.currentTreeNum].length - 1],
//)
//}
/*
 * Update the leaf at the specified index with the given value.
 */
//public update(
//_absoluteIndex: number,
//_value: Leaf,
//) {
//if (_absoluteIndex >= this.leaves.length) {
//throw new Error('The leaf index specified is too large')
//}
//_value = BigInt(_value)
//const capacity = this.leavesPerNode ** this.depth
//const treeNum = Math.floor(_absoluteIndex / capacity)
//const subTree = new IncrementalTree(
//this.depth,
//this.zeroValue,
//this.leavesPerNode,
//this.hashFunc,
//)
//this.leaves[_absoluteIndex] = _value
//const s = treeNum * capacity
//for (let i = s; i < s + capacity; i ++) {
//if (i >= this.leaves.length) {
//break
//}
//subTree.insert(this.leaves[i])
//}
//this.filledPaths[treeNum] = subTree.filledPaths
//this.filledSubtrees[treeNum] = subTree.filledSubtrees
//this.roots[treeNum] = subTree.root
//}
/*
 * Returns the leaf value at the given index
 */
//public getLeaf(_index: number): Leaf {
//return this.leaves[_index]
//}
/*
 * Generates a Merkle proof from a subroot to the root.
 */
//public genMerkleSubrootPath(
//_absoluteStartIndex: number, // inclusive
//_absoluteEndIndex: number, // exclusive
//): MerkleProof {
//assert(_absoluteEndIndex > _absoluteStartIndex)
//const capacity = this.leavesPerNode ** this.depth
//const treeNum = Math.floor(_absoluteStartIndex / capacity)
//const leaves = this.leaves.slice(
//treeNum * capacity,
//treeNum * capacity + capacity,
//)
//return _genMerkleSubrootPath(
//_absoluteStartIndex % capacity,
//_absoluteEndIndex % capacity,
//this.leavesPerNode,
//this.depth,
//this.zeroValue,
//leaves,
//this.zeros,
//this.filledSubtrees[treeNum],
//this.filledPaths[treeNum],
//this.roots[treeNum],
//this.hashFunc,
//)
//}
/*
 *  Generates a Merkle proof from a leaf to the root.
 */
//public genMerklePath(
//_absoluteIndex: number,
//): MerkleProof {
//const capacity = this.leavesPerNode ** this.depth
//const index = _absoluteIndex % capacity
//const treeNum = Math.floor(_absoluteIndex / capacity)
//assert(treeNum < this.roots.length)
//return _genMerklePath(
//index,
//this.leavesPerNode,
//this.depth,
//this.leaves,
//this.zeros,
//this.filledPaths[treeNum],
//this.roots[treeNum],
//)
//}
/*
 * Return true if the given Merkle path is valid, and false otherwise.
 */
//public static verifyMerklePath(
//_proof: MerkleProof,
//_hashFunc: (leaves: BigInt[]) => BigInt,
//): boolean {
//return _verifyMerklePath( _proof, _hashFunc)
//}
/*  Deep-copies this object
 */
//public copy(): MultiIncrementalTree {
//const newTree = new MultiIncrementalTree(
//this.depth,
//this.zeroValue,
//this.leavesPerNode,
//this.hashFunc,
//)
//newTree.leaves = deepCopyBigIntArray(this.leaves)
//newTree.zeros = deepCopyBigIntArray(this.zeros)
//newTree.roots = deepCopyBigIntArray(this.roots)
//newTree.currentTreeNum = this.currentTreeNum
//newTree.nextIndex = this.nextIndex
//newTree.filledSubtrees = unstringifyBigInts(JSON.parse(
//JSON.stringify(stringifyBigInts(this.filledSubtrees))
//))
//newTree.filledPaths = unstringifyBigInts(JSON.parse(
//JSON.stringify(stringifyBigInts(this.filledPaths))
//))
//return newTree
//}
//public equals(t: MultiIncrementalTree): boolean {
//const eq =
//this.currentTreeNum === t.currentTreeNum &&
//this.depth === t.depth &&
//this.zeroValue === t.zeroValue &&
//this.leavesPerNode === t.leavesPerNode &&
//this.nextIndex === t.nextIndex &&
//this.roots.length === t.roots.length &&
//this.leaves.length === t.leaves.length &&
//JSON.stringify(stringifyBigInts(this.filledPaths)) ===
//JSON.stringify(stringifyBigInts(t.filledPaths)) &&
//JSON.stringify(stringifyBigInts(this.filledSubtrees)) ===
//JSON.stringify(stringifyBigInts(t.filledSubtrees))
//if (!eq) { return false }
//for (let i = 0; i < this.roots.length; i ++) {
//if (this.roots[i] !== t.roots[i]) {
//return false
//}
//}
//for (let i = 0; i < this.leaves.length; i ++) {
//if (this.leaves[i] !== t.leaves[i]) {
//return false
//}
//}
//return true
//}
//}
//export {
//IncrementalTree,
//MultiIncrementalTree,
//calculateRoot,
//}
//# sourceMappingURL=OptimisedMT.js.map