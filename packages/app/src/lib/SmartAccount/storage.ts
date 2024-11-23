import type { Hex } from 'viem';
import type { PasskeyCredential } from './passkeys';

export type StoredPasskey = {
    id: Hex;
    pubKey: { x: Hex; y: Hex };
}

const PASSKEY_STORAGE_KEY = 'passkey';

/**
 * Sets an item in the local storage.
 * @param key - The key to set the item with.
 * @param value - The value to be stored. It will be converted to a string using JSON.stringify.
 * @template T - The type of the value being stored.
 */
function setItem<T>(key: string, value: T) {
    // to prevent silly mistakes with double stringifying
    if (typeof value === 'string') {
        localStorage.setItem(key, value)
    } else {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

/**
 * Retrieves the value associated with the specified key from the local storage.
 *
 * @param key - The key of the item to retrieve.
 * @returns The value associated with the key, or null if the key does not exist.
 */
function getItem(key: string): string | null {
    return localStorage.getItem(key)
}

// Add helper functions for BigInt serialization
export function serializePasskey(passkey: PasskeyCredential): string {
    return JSON.stringify(passkey, (_, value) => {
        // Convert BigInt to string during serialization
        if (typeof value === 'bigint') {
            return value.toString();
        }
        return value;
    });
}

export function deserializePasskey(storedKey: string): PasskeyCredential {
    console.log("🚀 | deserializePasskey | storedKey:", storedKey)
    return JSON.parse(storedKey, (_, value) => {
        // Check if the string might be a serialized BigInt
        if (typeof value === 'string' && /^\d+n$/.test(value)) {
            return BigInt(value.slice(0, -1));
        }
        return value;
    }) as PasskeyCredential;
}

/**
 * Stores a passkey in local storage.
 * @param passkey - The passkey to store
 */
export function storePasskey(passkey: PasskeyCredential): void {
    const serializedPasskey = serializePasskey(passkey);
    setItem(PASSKEY_STORAGE_KEY, serializedPasskey);
}

/**
 * Retrieves the stored passkey from local storage.
 * @returns The stored passkey or null if none exists
 */
export function getStoredPasskey(): PasskeyCredential | null {
    try {
        const storedKey = getItem(PASSKEY_STORAGE_KEY);
        if (!storedKey) return null;

        const passkey = deserializePasskey(storedKey);
        console.log("🚀 | getStoredPasskey | passkey:", passkey)
        // Ensure publicKey x and y values are BigInt
        if (typeof passkey.publicKey.x === 'string') {
            passkey.publicKey.x = BigInt(passkey.publicKey.x);
        }
        if (typeof passkey.publicKey.y === 'string') {
            passkey.publicKey.y = BigInt(passkey.publicKey.y);
        }

        // Validate the passkey structure
        if (!passkey.id || !passkey.publicKey || !passkey.publicKeyHex || !passkey.raw) {
            return null;
        }
        return passkey;
    } catch (error) {
        console.error('Error retrieving stored passkey:', error);
        return null;
    }
}

/**
 * Removes the stored passkey from local storage.
 */
export function clearStoredPasskey(): void {
    localStorage.removeItem(PASSKEY_STORAGE_KEY);
}

/**
 * Checks if a passkey exists in local storage.
 * @returns boolean indicating if a passkey exists
 */
export function hasStoredPasskey(): boolean {
    return getStoredPasskey() !== null;
}
