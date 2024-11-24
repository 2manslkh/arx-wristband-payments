
import { createPimlicoClient } from 'permissionless/clients/pimlico';
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { PUBLIC_PIMLICO_API_KEY } from '$env/static/public';
import { entryPoint07Address } from 'viem/account-abstraction';

const apiKey = PUBLIC_PIMLICO_API_KEY;
if (!apiKey) throw new Error('Missing PIMLICO_API_KEY');


export const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http('https://sepolia.base.org')
});

export const paymasterClient = createPimlicoClient({
    transport: http(`https://api.pimlico.io/v2/base-sepolia/rpc?apikey=${apiKey}`),
    entryPoint: {
        address: entryPoint07Address,
        version: '0.7'
    }
});