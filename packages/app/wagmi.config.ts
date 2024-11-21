import { ContractConfig, defineConfig } from '@wagmi/cli';

import { actions } from '@wagmi/cli/plugins';
import { foundry } from '@wagmi/cli/plugins'

function overrideDeployments(): ContractConfig[] {
  return [
    {
      name: 'TestContract',
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'balances',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'deposit',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_user',
              type: 'address',
            },
          ],
          name: 'getBalance',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'withdraw',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      address: '0x1234567890123456789012345678901234567890',
    },
  ];
}

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [...overrideDeployments()],
  plugins: [actions(), foundry({
    project: '../contracts',
  }),],
});
