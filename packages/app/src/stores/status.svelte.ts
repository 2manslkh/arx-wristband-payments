let status = $state<string>('');
let transactionLink = $state<string>('');

export function getStatus() {
    return status;
}

export function setStatus(newStatus: string) {
    status = newStatus;
}

export function setTransactionLink(hash: string) {
    transactionLink = `https://sepolia.basescan.org/tx/${hash}`;
}

export function getTransactionLink() {
    return transactionLink;
}