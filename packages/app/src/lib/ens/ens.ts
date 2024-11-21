import type { Address } from 'viem';
import { type Config, switchChain } from '@wagmi/core';
import { baseSepolia, sepolia } from 'viem/chains';
import type { SmartAccountClient } from 'permissionless/clients';
import { writeReverseRegistrarSetName, zupayRegistrarAbi, zupayRegistrarAddress } from '../../generated';

export interface ENSRegistrationResult {
    success: boolean;
    transactionHash?: string;
    error?: string;
}

export async function registerENS(
    wagmiConfig: Config,
    smartAccount: SmartAccountClient,
    name: string,
    address: Address
): Promise<ENSRegistrationResult> {
    try {


        // Change chain to base sepolia
        await switchChain(wagmiConfig, { chainId: 84532 });

        const userOperation = await smartAccount.sendUserOperation({
            calls: [
                {
                    to: zupayRegistrarAddress,
                    abi: zupayRegistrarAbi,
                    functionName: 'register',
                    args: [
                        name,
                        address,
                    ],
                },
            ],
        });

        // Wait for the transaction to be mined
        const receipt = await smartAccount.waitForUserOperationReceipt({
            hash: userOperation,
        });
        console.log('Transaction receipt:', receipt);


        return {
            success: true,
            transactionHash: receipt.receipt.transactionHash,
        };
    } catch (error) {
        console.error('ENS registration error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return {
            success: false,
            error: errorMessage,
        };
    }
}

export interface SetPrimaryNameResult {
    success: boolean;
    transactionHash?: string;
    error?: string;
}

export async function setPrimaryName(wagmiConfig: Config, name: string): Promise<SetPrimaryNameResult> {
    try {

        // Change chain to sepolia
        await switchChain(wagmiConfig, { chainId: sepolia.id });

        // Set the primary name
        const tx = await writeReverseRegistrarSetName(wagmiConfig, {
            args: [name],
        });


        return {
            success: true,
            transactionHash: tx,
        };
    } catch (error) {
        console.error('Set primary name error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return {
            success: false,
            error: errorMessage,
        };
    }
}
