import { walletConnect, injected } from '@wagmi/connectors';

// main.ts
import { createAppKit } from '@reown/appkit'
import { baseSepolia, hardhat } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { PUBLIC_REOWN_PROJECT_ID } from '$env/static/public'
import { getAccount, getWalletClient as getWagmiWalletClient } from '@wagmi/core'
import { EthereumProvider } from '@walletconnect/ethereum-provider'
import { createWalletClient, http, type EIP1193Provider } from 'viem'
import { getConnectorClient } from '@wagmi/core'

// 1. Get a project ID at https://cloud.reown.com
const projectId = PUBLIC_REOWN_PROJECT_ID


if (!projectId) {
  throw ("PUBLIC_REOWN_PROJECT_ID not set")
}

export const networks = [baseSepolia, hardhat]

// 2. Set up Wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  transports: {
    [baseSepolia.id]: http('https://sepolia.base.org'),
    [hardhat.id]: http('https://127.0.0.1:8545')
  },
  chains: [baseSepolia, hardhat],
  projectId,
  networks,
})

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
  features: {
    email: true, // default to true
    socials: ['google', 'x', 'github', 'discord', 'apple', 'facebook', 'farcaster'],
    emailShowWallets: true, // default to true
  },
  debug: true
})

export async function getWalletClient() {
  return await getConnectorClient(wagmiAdapter.wagmiConfig)
}

// 5. Alternatively use w3m component buttons within the index.html file
