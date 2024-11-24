import { getHaloAccount, getHaloAddress, setHaloAccount, setHaloAddress } from '$stores/account.svelte';
import { execHaloCmdWeb } from '@arx-research/libhalo/api/web';
import {
    serializeTransaction,
    type Hex,
    hashTypedData,
    hashMessage,
    zeroAddress,
    type Address,
} from 'viem';

import { toAccount } from 'viem/accounts';
import { hexlify, type BytesLike } from '@ethersproject/bytes';
import { setStatus } from '$stores/status.svelte';
import type { StatusCallbackDetails } from '@arx-research/libhalo/types';

function defaultHaloCallback(status: string, execMethod: StatusCallbackDetails) {
    console.info(status, execMethod);
    const messages: { [key: string]: string } = {
        init: "Please tap your Halo card to the back of your smartphone.",
        again: "Processing..",
        retry: "There was an error. Please try tapping your card again.",
        finished: "Processing...",
    };
    setStatus(messages[status] || `${status}, ${execMethod}`);
}

export async function retrieveHaloAddress() {
    if (getHaloAddress() === zeroAddress) {
        const nfcResult = await execHaloCmdWeb({ name: 'get_pkeys' }, { method: 'webnfc', statusCallback: defaultHaloCallback });
        setHaloAddress(nfcResult.etherAddresses['1'] as `0x${string}`);
    }
    return getHaloAddress();
}

async function signDigest(digest: BytesLike): Promise<string> {
    const res = await execHaloCmdWeb(
        {
            name: 'sign',
            keyNo: 1,
            digest: hexlify(digest).substring(2)
        },
        { method: 'webnfc', statusCallback: defaultHaloCallback }
    );

    return res.signature.ether;
}

export async function retrieveHaloAccount() {
    if (getHaloAccount() === null) {
        let haloAddress: Address = zeroAddress;
        haloAddress = await retrieveHaloAddress();
        const haloAccount = toAccount({
            address: haloAddress,
            async signMessage({ message }) {
                const messageHash = hashMessage(message);
                const signature = await signDigest(messageHash);
                return signature as Hex;
            },

            async signTransaction(transaction) {
                const serializedTransaction = serializeTransaction(transaction);
                const transactionHash = hexlify(serializedTransaction);
                const signature = await signDigest(transactionHash);
                return signature as Hex;
            },

            async signTypedData(typedData) {
                const { domain, types, message, primaryType } = typedData;

                const { EIP712Domain: _, ...filteredTypes } = types;

                const hash = hashTypedData({
                    domain,
                    types: filteredTypes,
                    primaryType: primaryType,
                    message
                });

                const signature = await signDigest(hash);
                return signature as Hex;
            }
        });
        setHaloAccount(haloAccount);
    }

    return getHaloAccount();
}
