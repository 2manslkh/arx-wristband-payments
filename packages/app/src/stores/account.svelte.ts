import type { Safe4337Pack } from "@safe-global/relay-kit";
import type { SmartAccountClient } from "permissionless";
import { zeroAddress, type Account, type Address } from "viem";
import type { WebAuthnAccount } from "viem/account-abstraction";

let haloAccount = $state<Account | null>(null);
let haloAddress = $state<Address>(zeroAddress);
let smartAccount = $state<SmartAccountClient | null>(null);
let smartAccountAddress = $state<Address>(zeroAddress);
let safeSmartAccount = $state<Safe4337Pack | null>(null);
let safeSmartAccountAddress = $state<Address>(zeroAddress);
let passkeyOwner = $state<WebAuthnAccount | null>(null);
let passkeyOwnerAddress = $state<Address>(zeroAddress);

export function getPasskeyOwnerAddress() {
    return passkeyOwnerAddress;
}

export function setPasskeyOwnerAddress(address: Address) {
    passkeyOwnerAddress = address;
}

export function getPasskeyOwner() {
    return passkeyOwner;
}

export function setPasskeyOwner(owner: WebAuthnAccount) {
    passkeyOwner = owner;
}

export function getHaloAccount() {
    return haloAccount;
}

export function setHaloAccount(account: Account) {
    haloAccount = account;
}

export function getHaloAddress() {
    return haloAddress;
}

export function setHaloAddress(address: Address) {
    haloAddress = address;
}

export function getSmartAccount() {
    return smartAccount;
}

export function setSmartAccount(account: SmartAccountClient) {
    smartAccount = account;
}

export function getSafeSmartAccount() {
    return safeSmartAccount;
}

export function setSafeSmartAccount(account: Safe4337Pack) {
    safeSmartAccount = account;
}

export function getSafeSmartAccountAddress() {
    return safeSmartAccountAddress;
}

export function setSafeSmartAccountAddress(address: Address) {
    safeSmartAccountAddress = address;
}

export function getSmartAccountAddress() {
    return smartAccountAddress;
}

export function setSmartAccountAddress(address: Address) {
    smartAccountAddress = address;
}