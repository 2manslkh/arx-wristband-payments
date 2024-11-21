import { zeroAddress, type Account, type Address } from "viem";

let haloAccount = $state<Account | null>(null);
let haloAddress = $state<Address>(zeroAddress);


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

