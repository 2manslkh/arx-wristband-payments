<script lang="ts">
  import { getBlockExplorerAddressUrl } from '$lib/util/blockExplorer';
  import { getHaloAddress, getSmartAccountAddress } from '$stores/account.svelte';

  import { ExternalLink, Wallet } from 'lucide-svelte';

  let { haloEthBalance, haloCoinBalance, smartEthBalance, smartCoinBalance } = $props();
</script>

<div class="w-full space-y-6">
  <!-- Halo Wallet Balances -->
  <div class="space-y-2">
    <a
      href={getBlockExplorerAddressUrl(getHaloAddress())}
      target="_blank"
      rel="noopener noreferrer"
      class="group inline-flex items-center gap-1 hover:text-primary transition-colors">
      <h3 class="text-sm font-medium text-muted-foreground group-hover:text-primary">Halo Wallet</h3>
      <ExternalLink class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
    <div class="flex items-center justify-between p-4 rounded-lg bg-secondary">
      <div class="flex items-center gap-2">
        <Wallet class="w-5 h-5" />
        <span>ETH Balance</span>
      </div>
      <span class="font-mono">{haloEthBalance}</span>
    </div>
    <div class="flex items-center justify-between p-4 rounded-lg bg-secondary">
      <div class="flex items-center gap-2">
        <Wallet class="w-5 h-5" />
        <span>COIN Balance</span>
      </div>
      <span class="font-mono">{haloCoinBalance}</span>
    </div>
  </div>

  <!-- Smart Account Balances -->
  <div class="space-y-2">
    <a
      href={getBlockExplorerAddressUrl(getSmartAccountAddress())}
      target="_blank"
      rel="noopener noreferrer"
      class="group inline-flex items-center gap-1 hover:text-primary transition-colors">
      <h3 class="text-sm font-medium text-muted-foreground group-hover:text-primary">Smart Account</h3>
      <ExternalLink class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
    <div class="flex items-center justify-between p-4 rounded-lg bg-secondary">
      <div class="flex items-center gap-2">
        <Wallet class="w-5 h-5" />
        <span>ETH Balance</span>
      </div>
      <span class="font-mono">{smartEthBalance}</span>
    </div>
    <div class="flex items-center justify-between p-4 rounded-lg bg-secondary">
      <div class="flex items-center gap-2">
        <Wallet class="w-5 h-5" />
        <span>COIN Balance</span>
      </div>
      <span class="font-mono">{smartCoinBalance}</span>
    </div>
  </div>
</div>
