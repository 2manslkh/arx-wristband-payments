import { WebAuthnP256 } from 'ox';
import { toBytes, toHex, type Hex } from 'viem';
import { getStoredPasskey } from './storage';
import { extractPasskeyData } from '@safe-global/protocol-kit';

export type PasskeyCredential = {
    id: string;
    publicKeyHex: `0x${string}`;
    publicKey: { prefix: number; x: bigint; y: bigint };
    raw: PublicKeyCredential;
};

function publicKeyToHex({
    prefix,
    x,
    y
}: {
    prefix: number;
    x: bigint;
    y: bigint;
}): `0x${string}` {
    // Convert x and y to 32-byte padded hex values
    const prefixHex = toHex(prefix, { size: 1 });
    const xHex = toHex(x, { size: 32 }); // Ensure it's padded to 32 bytes
    const yHex = toHex(y, { size: 32 }); // Ensure it's padded to 32 bytes

    // Concatenate the prefix 0x04 and the hex strings of x and y
    return `${prefixHex}${xHex.slice(2)}${yHex.slice(2)}`; // Remove the "0x" prefix from x and y
}


export async function createPasskey(username: string): Promise<PasskeyCredential> {
    try {
        const credential = await WebAuthnP256.createCredential({
            name: username
        });

        return {
            id: credential.id,
            publicKey: credential.publicKey,
            publicKeyHex: publicKeyToHex(credential.publicKey),
            raw: credential.raw
        };
    } catch (error) {
        console.error('Error creating passkey:', error);
        throw error;
    }
};

export async function signInWithPasskey() {
    try {
        // Get the stored passkey
        let stored = getStoredPasskey();
        if (!stored) {
            // Create a new passkey
            stored = await createPasskey("Zupay 1");
        };

        const options = WebAuthnP256.getCredentialRequestOptions({
            challenge: '0xdeadbeef',
        })
        // const credential = await window.navigator.credentials.get(options)

        await verifyPasskey(stored);
        return stored;
    } catch (error) {
        console.error('Error signing in with passkey:', error);
        throw error;
    }
}

export async function verifyPasskey(credential: PasskeyCredential) {
    const { metadata, signature } = await WebAuthnP256.sign({
        credentialId: credential.id,
        challenge: '0xdeadbeef',
    })

    const result = await WebAuthnP256.verify({
        metadata,
        challenge: '0xdeadbeef',
        publicKey: credential.publicKey,
        signature,
    })
    console.log("🚀 | verifyPasskey | result:", result)
}


