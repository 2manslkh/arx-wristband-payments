import { getAccount } from '@wagmi/core';
import { wagmiConfig } from '$lib/wagmi';
import type { Address, Hash, Chain } from 'viem';

type ExplorerType = 'tx' | 'address';

const getBlockExplorerUrl = (identifier: Hash | Address, type: ExplorerType): string => {
  try {
    const chains = wagmiConfig.chains;
    const { chainId } = getAccount(wagmiConfig);
    const chain = chains.find((chain: Chain) => chain.id === chainId);

    if (!chain) {
      return ''; // Return empty string if no chain is selected
    }

    // Get all available block explorers for the chain
    const explorers = chain.blockExplorers;

    if (!explorers || Object.keys(explorers).length === 0) {
      return ''; // Return empty string if no block explorer is found
    }

    // Prefer default explorer, fallback to first available
    const explorer = explorers.default || Object.values(explorers)[0];

    // Remove trailing slash if present
    const baseUrl = explorer.url.replace(/\/$/, '');

    // Construct URL based on type
    return `${baseUrl}/${type}/${identifier}`;
  } catch (error) {
    console.warn('Error getting block explorer URL:', error);
    return ''; // Return empty string on any error
  }
};

export const getBlockExplorerTxUrl = (txHash: Hash): string => {
  return getBlockExplorerUrl(txHash, 'tx');
};

export const getBlockExplorerAddressUrl = (address: Address): string => {
  return getBlockExplorerUrl(address, 'address');
};