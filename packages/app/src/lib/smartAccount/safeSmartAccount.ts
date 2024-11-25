import { toSafeSmartAccount } from "permissionless/accounts"
import 'dotenv/config';
import { createSmartAccountClient, type SmartAccountClient } from 'permissionless';
import { createPublicClient, getContract, http, parseEther, zeroAddress, type Address, type EIP1193Provider, type LocalAccount, type WalletClient } from 'viem';
import { baseSepolia } from 'viem/chains';
import { PUBLIC_PIMLICO_API_KEY } from '$env/static/public';

import { entryPoint06Address, entryPoint07Address, toCoinbaseSmartAccount, toWebAuthnAccount } from 'viem/account-abstraction';
import { tokenAbi, tokenAddress } from '../../generated';
import { getSafeSmartAccount, getSmartAccount, setPasskeyOwner, setPasskeyOwnerAddress, setSafeSmartAccount, setSmartAccount, setSmartAccountAddress } from '$stores/account.svelte';
import { setStatus, setTransactionLink } from '$stores/status.svelte';
import { publicClient, paymasterClient } from '$lib/smartAccount/pimlico';
import { Safe4337Pack, type SponsoredPaymasterOption } from "@safe-global/relay-kit";
import { getStoredPasskey } from "./storage";


export async function getSafeSmartClient() {

	const passkey = getStoredPasskey();

	if (!passkey) {
		throw new Error('No passkey found. Please sign up first.');
	}

	const paymasterOptions = {
		isSponsored: true,
		paymasterAddress: "0x00000000000000fb866daaa79352cc568a005d96",
		paymasterTokenAddress: zeroAddress,
		paymasterUrl:
			`https://api.pimlico.io/v2/base-sepolia/rpc?apikey=${PUBLIC_PIMLICO_API_KEY}`
	}
	console.log("🚀 | getSafeSmartClient | paymasterOptions:", paymasterOptions)

	const smartAccountClient = await Safe4337Pack.init({
		provider: 'https://sepolia.base.org',
		signer: passkey,
		bundlerUrl: `https://api.pimlico.io/v2/base-sepolia/rpc?apikey=${PUBLIC_PIMLICO_API_KEY}`,
		paymasterOptions,
		options: {
			owners: [
				/* Other owners... */
			],
			threshold: 1
		}
	})

	setSafeSmartAccount(smartAccountClient);

	return smartAccountClient;

}

export async function signMessageWithSafeSmartClient() {
	const safeSmartAccountClient = getSafeSmartAccount();

	if (!safeSmartAccountClient) {
		throw new Error('Smart account client is undefined');
	}

	let safeMessage = safeSmartAccountClient.protocolKit.createMessage("Hello, world!")

	// We can ignore the account parameter because we know it's a smart account
	return safeSmartAccountClient.signSafeOperation(safeMessage);
}

export async function addOwnerToSmartAccount(newOwnerAddress: Address) {
	const smartAccountClient = getSmartAccount();

	if (!smartAccountClient) {
		throw new Error('Smart account client is undefined');
	}


}


export async function getSmartClient(signer: LocalAccount) {

	const smartAccount = await toSafeSmartAccount({
		client: publicClient,
		entryPoint: {
			address: entryPoint07Address,
			version: "0.7"
		},
		owners: [signer], // Changed to provide address directly
		version: "1.4.1"
	});

	// const smartAccount = await toCoinbaseSmartAccount({
	// 	client: publicClient,
	// 	owners: [signer],
	// })

	const smartAccountClient: SmartAccountClient = createSmartAccountClient({
		account: smartAccount,
		chain: baseSepolia,
		paymaster: paymasterClient,
		bundlerTransport: http(`https://api.pimlico.io/v2/base-sepolia/rpc?apikey=${PUBLIC_PIMLICO_API_KEY}`),
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

export async function smartDemo(signer: LocalAccount) {

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
