import { getChainId } from '@wagmi/core';
import { wagmiConfig } from '$lib/wagmi';

export const generateBlockExplorerUrl = (txnHash: string) => {
  const chainId = getChainId(wagmiConfig);

  switch (chainId) {
    case 338:
      return `https://explorer.cronos.org/testnet/tx/${txnHash}`;
    default:
      return `https://cronoscan.com/tx/${txnHash}`;
  }
};
