import { type ContractConfig, defineConfig } from '@wagmi/cli';

import { actions } from '@wagmi/cli/plugins';
import { foundry } from '@wagmi/cli/plugins';

function overrideDeployments(): ContractConfig[] {
  return [];
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
