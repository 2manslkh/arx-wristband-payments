// main.ts
import { createAppKit } from '@reown/appkit'

import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { PUBLIC_REOWN_PROJECT_ID } from '$env/static/public'

import { baseSepolia, hardhat } from '@reown/appkit/networks'
import { getAccount } from '@wagmi/core';
import { reconnect } from "@wagmi/core";



// 1. Get a project ID at https://cloud.reown.com
const projectId = PUBLIC_REOWN_PROJECT_ID


if (!projectId) {
  throw ("PUBLIC_REOWN_PROJECT_ID not set")
}

const networks = [baseSepolia, hardhat]

// 2. Set up Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

export const wagmiConfig = wagmiAdapter.wagmiConfig;

// 3. Configure the metadata
const metadata = {
  name: 'beststackk',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 3. Create the modal
export const web3modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [baseSepolia, hardhat],
  defaultNetwork: hardhat,
  metadata,
  projectId,

})

export function getCurrentAddressOrNull(): `0x${string}` | undefined {
  const { address } = getAccount(wagmiConfig);
  return address;
}



