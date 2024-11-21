import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Counter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const counterAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'decrement',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'increment',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CounterChanged',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TestContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const testContractAbi = [
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balances',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

export const testContractAddress =
  '0x1234567890123456789012345678901234567890' as const

export const testContractConfig = {
  address: testContractAddress,
  abi: testContractAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link counterAbi}__
 */
export const readCounter = /*#__PURE__*/ createReadContract({ abi: counterAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"getCount"`
 */
export const readCounterGetCount = /*#__PURE__*/ createReadContract({
  abi: counterAbi,
  functionName: 'getCount',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link counterAbi}__
 */
export const writeCounter = /*#__PURE__*/ createWriteContract({
  abi: counterAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"decrement"`
 */
export const writeCounterDecrement = /*#__PURE__*/ createWriteContract({
  abi: counterAbi,
  functionName: 'decrement',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"increment"`
 */
export const writeCounterIncrement = /*#__PURE__*/ createWriteContract({
  abi: counterAbi,
  functionName: 'increment',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link counterAbi}__
 */
export const simulateCounter = /*#__PURE__*/ createSimulateContract({
  abi: counterAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"decrement"`
 */
export const simulateCounterDecrement = /*#__PURE__*/ createSimulateContract({
  abi: counterAbi,
  functionName: 'decrement',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"increment"`
 */
export const simulateCounterIncrement = /*#__PURE__*/ createSimulateContract({
  abi: counterAbi,
  functionName: 'increment',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link counterAbi}__
 */
export const watchCounterEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: counterAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link counterAbi}__ and `eventName` set to `"CounterChanged"`
 */
export const watchCounterCounterChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: counterAbi,
    eventName: 'CounterChanged',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const readIMulticall3 = /*#__PURE__*/ createReadContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const readIMulticall3GetBasefee = /*#__PURE__*/ createReadContract({
  abi: iMulticall3Abi,
  functionName: 'getBasefee',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const readIMulticall3GetBlockHash = /*#__PURE__*/ createReadContract({
  abi: iMulticall3Abi,
  functionName: 'getBlockHash',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const readIMulticall3GetBlockNumber = /*#__PURE__*/ createReadContract({
  abi: iMulticall3Abi,
  functionName: 'getBlockNumber',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const readIMulticall3GetChainId = /*#__PURE__*/ createReadContract({
  abi: iMulticall3Abi,
  functionName: 'getChainId',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const readIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const readIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const readIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const readIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const readIMulticall3GetEthBalance = /*#__PURE__*/ createReadContract({
  abi: iMulticall3Abi,
  functionName: 'getEthBalance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const readIMulticall3GetLastBlockHash = /*#__PURE__*/ createReadContract(
  { abi: iMulticall3Abi, functionName: 'getLastBlockHash' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const writeIMulticall3 = /*#__PURE__*/ createWriteContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const writeIMulticall3Aggregate = /*#__PURE__*/ createWriteContract({
  abi: iMulticall3Abi,
  functionName: 'aggregate',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const writeIMulticall3Aggregate3 = /*#__PURE__*/ createWriteContract({
  abi: iMulticall3Abi,
  functionName: 'aggregate3',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const writeIMulticall3Aggregate3Value =
  /*#__PURE__*/ createWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const writeIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const writeIMulticall3TryAggregate = /*#__PURE__*/ createWriteContract({
  abi: iMulticall3Abi,
  functionName: 'tryAggregate',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const writeIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const simulateIMulticall3 = /*#__PURE__*/ createSimulateContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const simulateIMulticall3Aggregate =
  /*#__PURE__*/ createSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const simulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const simulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const simulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const simulateIMulticall3TryAggregate =
  /*#__PURE__*/ createSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const simulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testContractAbi}__
 */
export const readTestContract = /*#__PURE__*/ createReadContract({
  abi: testContractAbi,
  address: testContractAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testContractAbi}__ and `functionName` set to `"balances"`
 */
export const readTestContractBalances = /*#__PURE__*/ createReadContract({
  abi: testContractAbi,
  address: testContractAddress,
  functionName: 'balances',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testContractAbi}__ and `functionName` set to `"getBalance"`
 */
export const readTestContractGetBalance = /*#__PURE__*/ createReadContract({
  abi: testContractAbi,
  address: testContractAddress,
  functionName: 'getBalance',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link testContractAbi}__
 */
export const writeTestContract = /*#__PURE__*/ createWriteContract({
  abi: testContractAbi,
  address: testContractAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link testContractAbi}__ and `functionName` set to `"deposit"`
 */
export const writeTestContractDeposit = /*#__PURE__*/ createWriteContract({
  abi: testContractAbi,
  address: testContractAddress,
  functionName: 'deposit',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link testContractAbi}__ and `functionName` set to `"withdraw"`
 */
export const writeTestContractWithdraw = /*#__PURE__*/ createWriteContract({
  abi: testContractAbi,
  address: testContractAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link testContractAbi}__
 */
export const simulateTestContract = /*#__PURE__*/ createSimulateContract({
  abi: testContractAbi,
  address: testContractAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link testContractAbi}__ and `functionName` set to `"deposit"`
 */
export const simulateTestContractDeposit = /*#__PURE__*/ createSimulateContract(
  {
    abi: testContractAbi,
    address: testContractAddress,
    functionName: 'deposit',
  },
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link testContractAbi}__ and `functionName` set to `"withdraw"`
 */
export const simulateTestContractWithdraw =
  /*#__PURE__*/ createSimulateContract({
    abi: testContractAbi,
    address: testContractAddress,
    functionName: 'withdraw',
  })
