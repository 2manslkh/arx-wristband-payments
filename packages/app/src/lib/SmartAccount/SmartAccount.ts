import 'dotenv/config';
import { createSmartAccountClient, type SmartAccountClient } from 'permissionless';
import { toSafeSmartAccount, type SafeSmartAccountImplementation } from 'permissionless/accounts';
import { createPimlicoClient } from 'permissionless/clients/pimlico';
import { createPublicClient, getContract, http, parseEther, type Account, type Account, type Address, type EIP1193Provider, type LocalAccount, type WalletClient } from 'viem';
import { baseSepolia } from 'viem/chains';
import { PUBLIC_PIMLICO_API_KEY } from '$env/static/public';

const apiKey = PUBLIC_PIMLICO_API_KEY;
if (!apiKey) throw new Error('Missing PIMLICO_API_KEY');

import { entryPoint06Address, entryPoint07Address } from 'viem/account-abstraction';
import { tokenAbi, tokenAddress } from '../../generated';
import { setSmartAccount, setSmartAccountAddress } from '$stores/account.svelte';
import { setStatus, setTransactionLink } from '$stores/status.svelte';


export async function getSmartClient(signer: WalletClient) {

	console.log(signer.account?.address)

	await signer.requestAddresses();
	const [address] = await signer.getAddresses();
	console.log("🚀 | getSmartClient | address:", address)
	if (!address) throw new Error('No address found');

	const publicClient = createPublicClient({
		chain: baseSepolia,
		transport: http('https://sepolia.base.org')
	});

	const paymasterClient = createPimlicoClient({
		transport: http(`https://api.pimlico.io/v2/base-sepolia/rpc?apikey=${apiKey}`),
		entryPoint: {
			address: entryPoint07Address,
			version: '0.7'
		}
	});


	const safeAccount = await toSafeSmartAccount({
		client: publicClient,
		entryPoint: {
			address: entryPoint07Address,
			version: "0.7",
		},
		owners: [{ address }], // Changed to provide address directly
		saltNonce: 0n,
		safeVersion: "1.4.1",  // changed from version to safeVersion
	});

	const smartAccountClient: SmartAccountClient = createSmartAccountClient({

		account: safeAccount,
		chain: baseSepolia,
		paymaster: paymasterClient,
		bundlerTransport: http(`https://api.pimlico.io/v2/base-sepolia/rpc?apikey=${apiKey}`),
		userOperation: {
			estimateFeesPerGas: async () => (await paymasterClient.getUserOperationGasPrice()).fast
		}
	});

	setSmartAccount(smartAccountClient);
	if (smartAccountClient.account) {
		setSmartAccountAddress(smartAccountClient.account.address as Address);
	} else {
		throw new Error('Smart account client account is undefined');
	}

	return smartAccountClient;
}

export async function smartAccount(signer: LocalAccount) {

	const publicClient = createPublicClient({
		chain: baseSepolia,
		transport: http('https://sepolia.base.org')
	});

	console.info('Creating smart account client');

	const smartAccountClient = await getSmartClient(signer);

	if (smartAccountClient.account) {
		setSmartAccountAddress(smartAccountClient.account.address as Address);
	} else {
		throw new Error('Smart account client account is undefined');
	}

	const tokenContract = getContract({
		address: tokenAddress[84532] as `0x${string}`,
		abi: tokenAbi,
		client: {
			public: publicClient,
			wallet: smartAccountClient
		}
	});

	console.info('Calling drip function');
	const dripTx = await tokenContract.write.faucet([smartAccountClient.account.address]);

	console.info(`Token drip transaction sent. Hash: ${dripTx}`);
	console.info('Waiting for drip transaction receipt...');
	await publicClient.waitForTransactionReceipt({ hash: dripTx });

	console.info('Calling transfer function');

	const transferTx = await tokenContract.write.transfer([
		'0x88827a6d3693F33Bb4Ab61adc5a880Baa4B333bD',
		parseEther('11')
	]);


	console.info(`Token transfer transaction sent. Hash: ${transferTx}`);
	console.info('Waiting for transfer transaction receipt...');
	await publicClient.waitForTransactionReceipt({ hash: transferTx });
	setStatus('');
	setTransactionLink(transferTx);
	console.info('Smart account operations completed');
}
