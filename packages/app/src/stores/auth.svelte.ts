import { createPasskey, signInWithPasskey, verifyPasskey, type PasskeyCredential } from '$lib/smartAccount/passkeys';
import { storePasskey, getStoredPasskey, type StoredPasskey } from '$lib/smartAccount/storage';
import { getPasskeySmartClient } from '$lib/smartAccount/smartAccount';
import type { PasskeyArgType } from '@safe-global/protocol-kit';
import { setSafeAddress } from './safe.svelte';
import { loadPasskeyFromLocalStorage } from '$lib/smartAccount/safePasskeys';

let isAuthenticated = $state(false);
let currentPasskeyAddress = $state<string | null>(null);
let storedPasskey = $state<PasskeyCredential | null>(null);
let credential = $state<PasskeyCredential | null>(null);
let safePasskey = $state<PasskeyArgType | null>(null);

export async function login() {
    try {
        // Check if there's a stored passkey first
        const stored = getStoredPasskey();
        if (!stored) {
            throw new Error('No passkey found. Please sign up first.');
        }

        // Sign with passkey
        const passkeyCredential = await signInWithPasskey();

        // Initialize the smart account
        await getPasskeySmartClient();

        // Set authenticated state
        credential = passkeyCredential;
        storedPasskey = stored;
        isAuthenticated = true;

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export function logout() {
    isAuthenticated = false;
    currentPasskeyAddress = null;
    storedPasskey = null;
    credential = null;
    setSafeAddress(null);
}

export async function signup(username: string) {
    try {
        // Create new passkey using Ox
        const passkeyCredential = await createPasskey(username);
        console.log("🚀 | signup | passkeyCredential:", passkeyCredential)
        try {
            // Store the passkey to local storage
            storePasskey(passkeyCredential);
        } catch (storageError) {
            console.error('Failed to store passkey:', storageError);
            throw new Error('Failed to store passkey securely');
        }

        // Update state
        storedPasskey = passkeyCredential;
        credential = passkeyCredential;
        isAuthenticated = true;

        return passkeyCredential;
    } catch (error) {
        console.error('Signup failed:', error);
        throw error;
    }
}

export function getIsAuthenticated() {
    return isAuthenticated;
}

export function getCredential(): PasskeyCredential {
    // if null, try getting from local storage
    if (!credential) {
        const stored = getStoredPasskey();
        credential = stored;
    }

    if (!credential) {
        throw new Error('No credential found. Please sign up first.');
    }

    return credential;
}

export function getSafePasskey(): PasskeyArgType {
    if (!safePasskey) {
        const stored = loadPasskeyFromLocalStorage();
        safePasskey = stored;
    }
    return safePasskey;
}

export function setSafePasskey(passkey: PasskeyArgType) {
    safePasskey = passkey;
}
