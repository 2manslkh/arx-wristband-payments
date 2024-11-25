import type { Address } from 'viem';

let safeAddress = $state<Address | null>(null);
let isSafeDeployed = $state<boolean>(false);

export function getSafeAddress(): Address | null {
    if (!safeAddress) {
        return "";
    }
    return safeAddress;
}

export function setSafeAddress(address: Address | null) {
    safeAddress = address;
}

export function getIsSafeDeployed(): boolean {
    return isSafeDeployed;
}

export function setIsSafeDeployed(deployed: boolean) {
    isSafeDeployed = deployed;
}
