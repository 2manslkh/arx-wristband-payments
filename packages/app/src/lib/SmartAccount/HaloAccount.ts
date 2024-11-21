import { getHaloAccount, getHaloAddress, setHaloAccount, setHaloAddress } from '$stores/account.svelte';
import { execHaloCmdWeb } from '@arx-research/libhalo/api/web';
import {
	serializeTransaction,
	type Hex,
	type TypedDataDomain,
	zeroAddress,
	type Address,
} from 'viem';

import { _TypedDataEncoder, hashMessage } from '@ethersproject/hash';

import { toAccount } from 'viem/accounts';
import { hexlify, type BytesLike } from '@ethersproject/bytes';
import type { TypedDataField } from '@ethersproject/abstract-signer';


export async function retrieveHaloAddress() {
	if (getHaloAddress() === zeroAddress) {
		const nfcResult = await execHaloCmdWeb({ name: 'get_pkeys' }, { method: 'webnfc' });
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
		{ method: 'webnfc' }
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
				const messageHash = hashMessage(message.toString());
				const signature = await signDigest(messageHash);
				return signature as Hex;
			},

			async signTransaction(transaction) {
				// Implement using signDigest
				const serializedTransaction = serializeTransaction(transaction);
				const transactionHash = hexlify(serializedTransaction);
				const signature = await signDigest(transactionHash);
				return signature as Hex;
			},

			async signTypedData(typedData) {
				const { domain, types, message } = typedData;

				// Remove EIP712Domain from types
				// const { ...otherTypes } = types;

				const signature = await signDigest(
					_TypedDataEncoder.hash(
						domain as TypedDataDomain,
						types as Record<string, Array<TypedDataField>>,
						message as Record<string, any>
					)
				);
				return signature as Hex;
			}
		});
		setHaloAccount(haloAccount);
	}

	return getHaloAccount();
}
