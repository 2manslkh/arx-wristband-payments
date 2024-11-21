import { zeroAddress, zeroHash } from "viem";
import { tokenAbi } from "../../generated";
import type { SmartAccountClient } from "permissionless";

export async function transferToken(
    smartAccount: SmartAccountClient,
    tokenAddress: `0x${string}`,
    receiver: `0x${string}`,
    amount: bigint
): Promise<{ success: boolean, transactionHash: `0x${string}`, error?: string }> {
    if (!tokenAddress || tokenAddress === zeroAddress) {
        throw new Error('Invalid token address');
    }

    if (!receiver || receiver === zeroAddress) {
        throw new Error('Invalid receiver address');
    }

    try {


        // ERC20 transfer function selector and encoded data
        const userOperation = await smartAccount.sendUserOperation({
            calls: [
                {
                    to: tokenAddress,
                    abi: tokenAbi,
                    functionName: 'transfer',
                    args: [
                        receiver,
                        amount,
                    ],
                },
            ],
        });

        // Wait for the transaction to be mined
        const receipt = await smartAccount.waitForUserOperationReceipt({
            hash: userOperation,
        });
        return {
            success: true,
            transactionHash: receipt.receipt.transactionHash,
        };

    } catch (error) {
        console.error('Token Transfer error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return {
            success: false,
            error: errorMessage,
            transactionHash: zeroHash,
        };
    }


}