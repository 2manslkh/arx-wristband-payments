<script lang="ts">
  import { account } from '$stores';

  import { shortenAddress } from '$libs/util/shortenAddress';
  import { web3Modal } from '$libs/wagmi';

  function handleConnectWallet() {
    // Do not open if connection is active
    web3Modal.open({ view: 'Connect' });
  }

  function handleConfigureWallet() {
    // Do not open if connection is active
    web3Modal.open({ view: 'Account' });
  }
</script>

{#if !$account?.isConnected}
  <!-- Show Connect Wallet -->
  <button
    class="border border-black bg-white py-4 px-6 body-semibold-2 text-black text-[16px] leading-[18px]"
    on:click={handleConnectWallet}>
    CONNECT
  </button>
{:else}
  <!-- Show user address -->
  <button
    class="flex flex-row items-center justify-center gap-[9px] border border-black bg-white py-4 px-6 body-semibold-2 text-black text-[16px] leading-[18px]"
    on:click={handleConfigureWallet}>
    {shortenAddress($account.address ?? 'undefined', 4, 4)}
  </button>
{/if}
