let status = $state<string>('');

export function getStatus() {
    return status;
}

export function setStatus(newStatus: string) {
    status = newStatus;
}
