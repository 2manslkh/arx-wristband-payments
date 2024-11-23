import { createWebAuthnCredential, toWebAuthnAccount, type WebAuthnAccount } from 'viem/account-abstraction'

export async function getOwnerFromPasskey(): Promise<WebAuthnAccount> {
    // Register a credential (ie. passkey).
    const credential = await createWebAuthnCredential({
        name: 'zupay.id',

    })

    // Create a WebAuthn owner account from the credential.
    return toWebAuthnAccount({ credential })
}
