import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const tokenAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'initialSupply', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'faucet',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const tokenAddress = {
  84532: '0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD',
} as const

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const tokenConfig = { address: tokenAddress, abi: tokenAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// reverseRegistrar
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reverseRegistrarAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'ensAddr', internalType: 'contract ENS', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'controller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'enabled', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ControllerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'resolver',
        internalType: 'contract NameResolver',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'DefaultResolverChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address', indexed: true },
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
    ],
    name: 'ReverseClaimed',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'claim',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'resolver', internalType: 'address', type: 'address' },
    ],
    name: 'claimForAddr',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'resolver', internalType: 'address', type: 'address' },
    ],
    name: 'claimWithResolver',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'controllers',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultResolver',
    outputs: [
      { name: '', internalType: 'contract NameResolver', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ens',
    outputs: [{ name: '', internalType: 'contract ENS', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'node',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'controller', internalType: 'address', type: 'address' },
      { name: 'enabled', internalType: 'bool', type: 'bool' },
    ],
    name: 'setController',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'resolver', internalType: 'address', type: 'address' }],
    name: 'setDefaultResolver',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'name', internalType: 'string', type: 'string' }],
    name: 'setName',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'resolver', internalType: 'address', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' },
    ],
    name: 'setNameForAddr',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

export const reverseRegistrarAddress =
  '0xCF75B92126B02C9811d8c632144288a3eb84afC8' as const

export const reverseRegistrarConfig = {
  address: reverseRegistrarAddress,
  abi: reverseRegistrarAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// zupayRegistrar
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const zupayRegistrarAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_registry',
        internalType: 'contract IL2Registry',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'available',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'label', internalType: 'string', type: 'string' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetRegistry',
    outputs: [
      { name: '', internalType: 'contract IL2Registry', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'label', internalType: 'string', type: 'string', indexed: true },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'NameRegistered',
  },
] as const

export const zupayRegistrarAddress =
  '0x7e422c49FeC9E6CFCdfF373bb20893EDE19F6565' as const

export const zupayRegistrarConfig = {
  address: zupayRegistrarAddress,
  abi: zupayRegistrarAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const readToken = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const readTokenAllowance = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const readTokenBalanceOf = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const readTokenDecimals = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const readTokenName = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const readTokenOwner = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const readTokenSymbol = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const readTokenTotalSupply = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const writeToken = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const writeTokenApprove = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"faucet"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const writeTokenFaucet = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'faucet',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const writeTokenMint = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const writeTokenRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const writeTokenTransfer = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const writeTokenTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const writeTokenTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const simulateToken = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const simulateTokenApprove = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"faucet"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const simulateTokenFaucet = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'faucet',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const simulateTokenMint = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const simulateTokenRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const simulateTokenTransfer = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const simulateTokenTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const simulateTokenTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const watchTokenEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenAbi,
  address: tokenAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const watchTokenApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenAbi,
  address: tokenAddress,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const watchTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD)
 */
export const watchTokenTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenAbi,
  address: tokenAddress,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link reverseRegistrarAbi}__
 */
export const readReverseRegistrar = /*#__PURE__*/ createReadContract({
  abi: reverseRegistrarAbi,
  address: reverseRegistrarAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"controllers"`
 */
export const readReverseRegistrarControllers = /*#__PURE__*/ createReadContract(
  {
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'controllers',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"defaultResolver"`
 */
export const readReverseRegistrarDefaultResolver =
  /*#__PURE__*/ createReadContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'defaultResolver',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"ens"`
 */
export const readReverseRegistrarEns = /*#__PURE__*/ createReadContract({
  abi: reverseRegistrarAbi,
  address: reverseRegistrarAddress,
  functionName: 'ens',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"node"`
 */
export const readReverseRegistrarNode = /*#__PURE__*/ createReadContract({
  abi: reverseRegistrarAbi,
  address: reverseRegistrarAddress,
  functionName: 'node',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"owner"`
 */
export const readReverseRegistrarOwner = /*#__PURE__*/ createReadContract({
  abi: reverseRegistrarAbi,
  address: reverseRegistrarAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link reverseRegistrarAbi}__
 */
export const writeReverseRegistrar = /*#__PURE__*/ createWriteContract({
  abi: reverseRegistrarAbi,
  address: reverseRegistrarAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"claim"`
 */
export const writeReverseRegistrarClaim = /*#__PURE__*/ createWriteContract({
  abi: reverseRegistrarAbi,
  address: reverseRegistrarAddress,
  functionName: 'claim',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"claimForAddr"`
 */
export const writeReverseRegistrarClaimForAddr =
  /*#__PURE__*/ createWriteContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'claimForAddr',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"claimWithResolver"`
 */
export const writeReverseRegistrarClaimWithResolver =
  /*#__PURE__*/ createWriteContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'claimWithResolver',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeReverseRegistrarRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"setController"`
 */
export const writeReverseRegistrarSetController =
  /*#__PURE__*/ createWriteContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'setController',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"setDefaultResolver"`
 */
export const writeReverseRegistrarSetDefaultResolver =
  /*#__PURE__*/ createWriteContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'setDefaultResolver',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"setName"`
 */
export const writeReverseRegistrarSetName = /*#__PURE__*/ createWriteContract({
  abi: reverseRegistrarAbi,
  address: reverseRegistrarAddress,
  functionName: 'setName',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"setNameForAddr"`
 */
export const writeReverseRegistrarSetNameForAddr =
  /*#__PURE__*/ createWriteContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'setNameForAddr',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeReverseRegistrarTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link reverseRegistrarAbi}__
 */
export const simulateReverseRegistrar = /*#__PURE__*/ createSimulateContract({
  abi: reverseRegistrarAbi,
  address: reverseRegistrarAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"claim"`
 */
export const simulateReverseRegistrarClaim =
  /*#__PURE__*/ createSimulateContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'claim',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"claimForAddr"`
 */
export const simulateReverseRegistrarClaimForAddr =
  /*#__PURE__*/ createSimulateContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'claimForAddr',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"claimWithResolver"`
 */
export const simulateReverseRegistrarClaimWithResolver =
  /*#__PURE__*/ createSimulateContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'claimWithResolver',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateReverseRegistrarRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"setController"`
 */
export const simulateReverseRegistrarSetController =
  /*#__PURE__*/ createSimulateContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'setController',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"setDefaultResolver"`
 */
export const simulateReverseRegistrarSetDefaultResolver =
  /*#__PURE__*/ createSimulateContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'setDefaultResolver',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"setName"`
 */
export const simulateReverseRegistrarSetName =
  /*#__PURE__*/ createSimulateContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'setName',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"setNameForAddr"`
 */
export const simulateReverseRegistrarSetNameForAddr =
  /*#__PURE__*/ createSimulateContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'setNameForAddr',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateReverseRegistrarTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link reverseRegistrarAbi}__
 */
export const watchReverseRegistrarEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `eventName` set to `"ControllerChanged"`
 */
export const watchReverseRegistrarControllerChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    eventName: 'ControllerChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `eventName` set to `"DefaultResolverChanged"`
 */
export const watchReverseRegistrarDefaultResolverChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    eventName: 'DefaultResolverChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchReverseRegistrarOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link reverseRegistrarAbi}__ and `eventName` set to `"ReverseClaimed"`
 */
export const watchReverseRegistrarReverseClaimedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: reverseRegistrarAbi,
    address: reverseRegistrarAddress,
    eventName: 'ReverseClaimed',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link zupayRegistrarAbi}__
 */
export const readZupayRegistrar = /*#__PURE__*/ createReadContract({
  abi: zupayRegistrarAbi,
  address: zupayRegistrarAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link zupayRegistrarAbi}__ and `functionName` set to `"available"`
 */
export const readZupayRegistrarAvailable = /*#__PURE__*/ createReadContract({
  abi: zupayRegistrarAbi,
  address: zupayRegistrarAddress,
  functionName: 'available',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link zupayRegistrarAbi}__ and `functionName` set to `"targetRegistry"`
 */
export const readZupayRegistrarTargetRegistry =
  /*#__PURE__*/ createReadContract({
    abi: zupayRegistrarAbi,
    address: zupayRegistrarAddress,
    functionName: 'targetRegistry',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link zupayRegistrarAbi}__
 */
export const writeZupayRegistrar = /*#__PURE__*/ createWriteContract({
  abi: zupayRegistrarAbi,
  address: zupayRegistrarAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link zupayRegistrarAbi}__ and `functionName` set to `"register"`
 */
export const writeZupayRegistrarRegister = /*#__PURE__*/ createWriteContract({
  abi: zupayRegistrarAbi,
  address: zupayRegistrarAddress,
  functionName: 'register',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link zupayRegistrarAbi}__
 */
export const simulateZupayRegistrar = /*#__PURE__*/ createSimulateContract({
  abi: zupayRegistrarAbi,
  address: zupayRegistrarAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link zupayRegistrarAbi}__ and `functionName` set to `"register"`
 */
export const simulateZupayRegistrarRegister =
  /*#__PURE__*/ createSimulateContract({
    abi: zupayRegistrarAbi,
    address: zupayRegistrarAddress,
    functionName: 'register',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link zupayRegistrarAbi}__
 */
export const watchZupayRegistrarEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: zupayRegistrarAbi,
  address: zupayRegistrarAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link zupayRegistrarAbi}__ and `eventName` set to `"NameRegistered"`
 */
export const watchZupayRegistrarNameRegisteredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: zupayRegistrarAbi,
    address: zupayRegistrarAddress,
    eventName: 'NameRegistered',
  })
