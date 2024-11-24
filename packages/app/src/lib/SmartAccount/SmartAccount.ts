import { toSafeSmartAccount } from "permissionless/accounts"
import 'dotenv/config';
import { createSmartAccountClient, type SmartAccountClient } from 'permissionless';
import { createPublicClient, getContract, http, parseEther, type Address, type EIP1193Provider, type LocalAccount, type WalletClient } from 'viem';
import { baseSepolia } from 'viem/chains';
import { PUBLIC_PIMLICO_API_KEY } from '$env/static/public';

import { entryPoint07Address, toCoinbaseSmartAccount, toWebAuthnAccount } from 'viem/account-abstraction';
import { tokenAbi, tokenAddress } from '../../generated';
import { getSmartAccount, setPasskeyOwner, setPasskeyOwnerAddress, setSmartAccount, setSmartAccountAddress } from '$stores/account.svelte';
import { setStatus, setTransactionLink } from '$stores/status.svelte';
import { getAddressFromPublicKey } from '$lib/util/getAddressFromPublicKey';
import { publicClient, paymasterClient } from '$lib/smartAccount/pimlico';
import { getCredential } from "$stores/auth.svelte";

export async function getPasskeySmartClient() {

	const credential = getCredential();
	const signer = toWebAuthnAccount({ credential: { id: credential.id, publicKey: credential.publicKeyHex } })
	console.log("🚀 | getPasskeySmartClient | signer:", signer)

	setPasskeyOwner(signer);
	setPasskeyOwnerAddress(getAddressFromPublicKey(signer.publicKey));

	const smartAccount = await toCoinbaseSmartAccount({
		client: publicClient,
		owners: [signer],
	})
	console.log("🚀 | getPasskeySmartClient | smartAccount:", smartAccount)

	const smartAccountClient: SmartAccountClient = createSmartAccountClient({
		account: smartAccount,
		chain: baseSepolia,
		paymaster: paymasterClient,
		bundlerTransport: http(`https://api.pimlico.io/v2/base-sepolia/rpc?apikey=${PUBLIC_PIMLICO_API_KEY}`),
		userOperation: {
			estimateFeesPerGas: async () => (await paymasterClient.getUserOperationGasPrice()).fast
		}
	});
	console.log("🚀 | getPasskeySmartClient | smartAccountClient:", smartAccountClient)

	setSmartAccount(smartAccountClient);
	return smartAccountClient;
}

export async function signMessageWithSmartPasskeyClient() {
	const smartAccountClient = getSmartAccount();

	if (!smartAccountClient) {
		throw new Error('Smart account client is undefined');
	}

	// We can ignore the account parameter because we know it's a smart account
	return smartAccountClient.signMessage({ message: "Hello, world!" });
}

export async function addOwnerToSmartAccount(newOwnerAddress: Address) {
	const smartAccountClient = getSmartAccount();

	if (!smartAccountClient) {
		throw new Error('Smart account client is undefined');
	}


}


export async function getSmartClient(signer: LocalAccount) {

	const safeAccount = await toSafeSmartAccount({
		client: publicClient,
		entryPoint: {
			address: entryPoint07Address,
			version: "0.7"
		},
		owners: [signer], // Changed to provide address directly
		version: "1.4.1"
	});

	const smartAccountClient: SmartAccountClient = createSmartAccountClient({
		account: safeAccount,
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
