import { watchAccount, type GetAccountReturnType } from '@wagmi/core';

import { wagmiConfig } from './client';

let isWatching = false;
let unWatchAccount: () => void;

let account = $state<GetAccountReturnType | null>(null);

export async function startWatching() {
  if (!isWatching) {
    unWatchAccount = watchAccount(wagmiConfig, {
      onChange(data) {
        console.log('Account Changed', data);
        account = data;
      },
    });

    isWatching = true;
  }
}

export function getAccount() {
  return account;
}

export function stopWatching() {
  unWatchAccount();
  isWatching = false;
}
