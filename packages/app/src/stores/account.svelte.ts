import type { SmartAccountClient } from "permissionless";
import { zeroAddress, type Account, type Address } from "viem";

let haloAccount = $state<Account | null>(null);
let haloAddress = $state<Address>(zeroAddress);
let smartAccount = $state<any | null>(null);
let smartAccountAddress = $state<Address>(zeroAddress);


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

export function getSmartAccountAddress() {
    return smartAccountAddress;
}

export function setSmartAccountAddress(address: Address) {
    smartAccountAddress = address;
}