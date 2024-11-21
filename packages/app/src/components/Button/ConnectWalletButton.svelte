<script lang="ts">
  import { shortenAddress } from "$lib/util/shortenAddress";
  import { web3modal } from "$lib/connect";
  import { wagmiAdapter } from "$lib/connect/web3modal";
  import { getAccount } from "@wagmi/core";

  const account = getAccount(wagmiAdapter.wagmiConfig);

  function handleConnectWallet() {
    // Do not open if connection is active
    web3modal.open({ view: "Connect" });
  }

  function handleConfigureWallet() {
    // Do not open if connection is active
    web3modal.open({ view: "Account" });
  }
</script>

{#if !account?.isConnected}
  <!-- Show Connect Wallet -->
  <button
    class="border border-black bg-white py-4 px-6 body-semibold-2 text-black text-[16px] leading-[18px]"
    on:click={handleConnectWallet}
  >
    CONNECT
  </button>
{:else}
  <!-- Show user address -->
  <button
    class="flex flex-row items-center justify-center gap-[9px] border border-black bg-white py-4 px-6 body-semibold-2 text-black text-[16px] leading-[18px]"
    on:click={handleConfigureWallet}
  >
    {shortenAddress(account.address ?? "undefined", 4, 4)}
  </button>
{/if}
