import { getContract, zeroAddress, zeroHash } from "viem";
import { tokenAbi } from "../../generated";
import type { SmartAccountClient } from "permissionless";
import { getPublicClient } from "$lib/connect/web3modal";
import { baseSepolia } from "viem/chains";

// Common validation function
const validateTransaction = (smartAccount: SmartAccountClient, tokenAddress: `0x${string}`, receiver: `0x${string}`) => {
    if (!smartAccount.account) {
        throw new Error('Smart account is undefined');
    }
    if (!tokenAddress || tokenAddress === zeroAddress) {
        throw new Error('Invalid token address');
    }
    if (!receiver || receiver === zeroAddress) {
        throw new Error('Invalid receiver address');
    }

    return { smartAccount, tokenAddress, receiver };
};

// Common contract setup
const getTokenContract = (tokenAddress: `0x${string}`, smartAccount: SmartAccountClient) => {
    const publicClient = getPublicClient();
    return getContract({
        address: tokenAddress[84532] as `0x${string}`,
        abi: tokenAbi,
        client: {
            public: publicClient,
            wallet: smartAccount
        }
    });
};

// Common error handler
const handleTransactionError = (error: unknown): { success: false, error: string, transactionHash: `0x${string}` } => {
    console.error('Transaction error:', error);
    return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        transactionHash: zeroHash,
    };
};

export async function transferToken(
    smartAccount: SmartAccountClient,
    tokenAddress: `0x${string}`,
    receiver: `0x${string}`,
    amount: bigint
) {
    try {
        validateTransaction(smartAccount, tokenAddress, receiver);

        const tokenContract = getTokenContract(tokenAddress, smartAccount);

        const transferTx = await tokenContract.write.transfer(
            [receiver, amount],
            { account: smartAccount.account?.address ?? zeroAddress, chain: baseSepolia }
        );

        return { success: true, transactionHash: transferTx };
    } catch (error) {
        return handleTransactionError(error);
    }
}

export async function dripToken(
    smartAccount: SmartAccountClient,
    tokenAddress: `0x${string}`,
    receiver: `0x${string}`,
) {
    console.log('Dripping token to', receiver);
    try {
        validateTransaction(smartAccount, tokenAddress, receiver);
        const tokenContract = getTokenContract(tokenAddress, smartAccount);
        console.log("🚀 | tokenContract:", tokenContract)

        const dripTx = await tokenContract.write.faucet(
            ["0x9CF6888b612C02d8e98e49391F3170cE3A73eb10"],
        );
        console.log("🚀 | dripTx:", dripTx)

        return { success: true, transactionHash: dripTx };
    } catch (error) {
        return handleTransactionError(error);
    }
}