import { type ContractConfig, defineConfig } from '@wagmi/cli';

import { actions } from '@wagmi/cli/plugins';
import { foundry } from '@wagmi/cli/plugins';

function overrideDeployments(): ContractConfig[] {
  return [{
    name: "zupayRegistrar",
    address: "0x7e422c49FeC9E6CFCdfF373bb20893EDE19F6565",
    abi: [
      {
        type: "constructor",
        inputs: [
          {
            name: "_registry",
            type: "address",
            internalType: "contract IL2Registry",
          },
        ],
        stateMutability: "nonpayable",
      },
      {
        type: "function",
        name: "available",
        inputs: [
          { name: "tokenId", type: "uint256", internalType: "uint256" },
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
      },
      {
        type: "function",
        name: "register",
        inputs: [
          { name: "label", type: "string", internalType: "string" },
          { name: "owner", type: "address", internalType: "address" },
        ],
        outputs: [],
        stateMutability: "nonpayable",
      },
      {
        type: "function",
        name: "targetRegistry",
        inputs: [],
        outputs: [
          {
            name: "",
            type: "address",
            internalType: "contract IL2Registry",
          },
        ],
        stateMutability: "view",
      },
      {
        type: "event",
        name: "NameRegistered",
        inputs: [
          {
            name: "label",
            type: "string",
            indexed: true,
            internalType: "string",
          },
          {
            name: "owner",
            type: "address",
            indexed: true,
            internalType: "address",
          },
        ],
        anonymous: false,
      },
    ],
  },
  {
    name: "reverseRegistrar",
    address: "0xCF75B92126B02C9811d8c632144288a3eb84afC8",
    abi: [
      {
        inputs: [
          { internalType: "contract ENS", name: "ensAddr", type: "address" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "controller",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "enabled",
            type: "bool",
          },
        ],
        name: "ControllerChanged",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "contract NameResolver",
            name: "resolver",
            type: "address",
          },
        ],
        name: "DefaultResolverChanged",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "node",
            type: "bytes32",
          },
        ],
        name: "ReverseClaimed",
        type: "event",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "claim",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "resolver", type: "address" },
        ],
        name: "claimForAddr",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "resolver", type: "address" },
        ],
        name: "claimWithResolver",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "controllers",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "defaultResolver",
        outputs: [
          {
            internalType: "contract NameResolver",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "ens",
        outputs: [
          { internalType: "contract ENS", name: "", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "addr", type: "address" }],
        name: "node",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "controller", type: "address" },
          { internalType: "bool", name: "enabled", type: "bool" },
        ],
        name: "setController",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "resolver", type: "address" },
        ],
        name: "setDefaultResolver",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "string", name: "name", type: "string" }],
        name: "setName",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "resolver", type: "address" },
          { internalType: "string", name: "name", type: "string" },
        ],
        name: "setNameForAddr",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  }];
}

function getLatestTokenDeployments(): Record<number, `0x${string}`> {
  return {};
}

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [...overrideDeployments()],
  plugins: [
    actions(),
    foundry({
      project: '../contracts',
      include: ['Token.json'],
      deployments: {
        Token: {
          84532: '0x8f8fcd2f80A118fD8413f1e11ed2aae990AA02dD',
        },
      },
    }),
  ],
});
