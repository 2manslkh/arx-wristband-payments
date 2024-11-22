import { keccak256, type Address } from 'viem';

// Example uncompressed public key (64 bytes without 0x04 prefix)

export function getAddressFromPublicKey(publicKey: Address): `0x${string}` {
    const hashedPublicKey = keccak256(publicKey);

    const ethAddress = `0x${hashedPublicKey.slice(-40)}`;


    return ethAddress as `0x${string}`;
}