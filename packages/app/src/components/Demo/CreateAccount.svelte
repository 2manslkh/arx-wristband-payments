<!-- <script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { getPasskeySmartClient } from "$lib/SmartAccount/SmartAccount";
  import { Wallet, ExternalLink } from "lucide-svelte";
  import {
    getPasskeyOwnerAddress,
    getSmartAccount,
    getSmartAccountAddress,
    setSmartAccount,
    setSmartAccountAddress,
  } from "$stores/account.svelte";

  let isLoading = $state(false);

  async function handleCreateAccount() {
    try {
      isLoading = true;
      const smartAccount = await getPasskeySmartClient();

      // Set the smart account in the store
      setSmartAccount(smartAccount);

      if (smartAccount?.account?.address) {
        setSmartAccountAddress(smartAccount.account.address);
        // Get the passkey owner address
      }

      console.log("Smart Account created:", smartAccount);
    } catch (error) {
      console.error("Failed to create wallet:", error);
    } finally {
      isLoading = false;
    }
  }

  function openEtherscan(address: string) {
    // Using Sepolia network - change the URL based on your network
    window.open(`https://sepolia.basescan.org/address/${address}`, "_blank");
  }
</script>

<div class="flex flex-col gap-6 w-full max-w-sm">
  {#if !getSmartAccount()}
    <Button on:click={handleCreateAccount} class="w-full" disabled={isLoading}>
      <Wallet class="mr-2 h-4 w-4" />
      {isLoading ? "Creating..." : "Create Smart Account"}
    </Button>
  {:else}
    <div class="flex flex-col gap-4">
      {#if getPasskeyOwnerAddress()}
        <div class="p-4 rounded-lg bg-muted">
          <div class="flex justify-between items-center mb-1">
            <p class="text-sm font-medium">Passkey Owner:</p>
            <Button
              variant="ghost"
              size="sm"
              class="h-8 px-2"
              on:click={() => openEtherscan(getPasskeyOwnerAddress())}
            >
              <ExternalLink class="h-4 w-4" />
            </Button>
          </div>
          <p class="text-xs font-mono break-all">{getPasskeyOwnerAddress()}</p>
        </div>
      {/if}

      <div class="p-4 rounded-lg bg-muted">
        <div class="flex justify-between items-center mb-1">
          <p class="text-sm font-medium">Smart Account:</p>
          <Button
            variant="ghost"
            size="sm"
            class="h-8 px-2"
            on:click={() => openEtherscan(getSmartAccountAddress())}
          >
            <ExternalLink class="h-4 w-4" />
          </Button>
        </div>
        <p class="text-xs font-mono break-all">{getSmartAccountAddress()}</p>
      </div>

      <Button variant="outline" class="w-full" disabled>
        <Wallet class="mr-2 h-4 w-4" />
        Smart Account Ready
      </Button>
    </div>
  {/if}
</div> -->
