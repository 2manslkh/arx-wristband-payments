import { HttpNetworkUserConfig, NetworkUserConfig } from 'hardhat/types';
import { config, ethers, hardhatArguments, network, userConfig } from 'hardhat';

async function main() {

  // get keys of networks



  const allChains = Object.keys(userConfig.networks as NetworkUserConfig);
  console.log("🚀 | main | allChains:", allChains)
  // const chains = ['mumbai', 'goerli', 'gnosis', 'optimism_testnet', 'taiko_testnet', 'scroll_testnet'];
  const chains = allChains;
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  console.log(`Balances for ${address}`);

  let output: { [key: string]: string } = {};

  // throw error if no network is specified


  let results = await Promise.allSettled(
    chains.map((chain) => {

      if (!userConfig.networks) {
        throw new Error(`No network config found`);
      }

      //@ts-ignore
      const provider = new ethers.JsonRpcProvider(config.networks[chain].url);
      return provider.getBalance(address);
    })
  );

  let index = 0;
  for (const result of results) {
    if (result.status === 'rejected') {
      output[chains[index]] = "Failed to fetch balance";
    } else if (result.status === 'fulfilled') {
      output[chains[index]] = ethers.formatEther(result.value);
    }
    index++;
  }
  console.table(output);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
