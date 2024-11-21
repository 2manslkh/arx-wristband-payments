import 'dotenv/config';
import { createSmartAccountClient, type SmartAccountClient } from 'permissionless';
import { toSafeSmartAccount, type SafeSmartAccountImplementation } from 'permissionless/accounts';
import { createPimlicoClient } from 'permissionless/clients/pimlico';
import { createPublicClient, getContract, http, parseEther, type Address, type LocalAccount } from 'viem';
import { baseSepolia } from 'viem/chains';
import { PUBLIC_PIMLICO_API_KEY } from '$env/static/public';

const apiKey = PUBLIC_PIMLICO_API_KEY;
if (!apiKey) throw new Error('Missing PIMLICO_API_KEY');

import { entryPoint07Address } from 'viem/account-abstraction';
import { tokenAbi, tokenAddress } from '../../generated';
import { setSmartAccount, setSmartAccountAddress } from '$stores/account.svelte';

export async function smartAccount(signer: LocalAccount) {
	console.log("🚀 | smartAccount | signer:", signer)
	// Extract the account from the signer

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
			version: '0.7'
		},
		owners: [signer],
		version: '1.4.1'
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

	console.info('Step 5: Creating smart account client');

	console.info('Step 6: Sending test transaction');
	const txHash = await smartAccountClient.sendTransaction({
		to: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
		value: 0n,
	});

	console.info(`User operation included: https://sepolia.basescan.org/tx/${txHash}`);

	console.info('Step 8: Calling drip function');

	const tokenContract = getContract({
		address: tokenAddress[84532] as `0x${string}`,
		abi: tokenAbi,
		client: {
			public: publicClient,
			wallet: smartAccountClient
		}
	});
	const dripTx = await tokenContract.write.faucet([
		smartAccountClient.account.address,
	]);

	console.info(`Token drip transaction sent. Hash: ${dripTx}`);
	console.info('Waiting for drip transaction receipt...');
	await publicClient.waitForTransactionReceipt({ hash: dripTx });

	console.info('Step 9: Calling transfer function');

	const transferTx = await tokenContract.write.transfer([
		'0x0006278a13186Df0F5eF4ee77a86AA1d68d0656E',
		parseEther('11')
	]);

	console.info(`Token transfer transaction sent. Hash: ${transferTx}`);
	console.info('Waiting for transfer transaction receipt...');
	await publicClient.waitForTransactionReceipt({ hash: transferTx });

	console.info('Smart account operations completed');
}
