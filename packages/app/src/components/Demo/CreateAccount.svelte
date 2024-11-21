<script lang="ts">
  import { MagicLoginButton } from "$components/Button";
  import { Button } from "$lib/components/ui/button";
  //   import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { getWalletClient } from "$lib/connect/web3modal";

  import { getSmartClient } from "$lib/SmartAccount/SmartAccount";
  import { Wallet } from "lucide-svelte";

  let isLoading = $state(false);

  async function handleCreateAccount() {
    try {
      isLoading = true;
      // Add your reown wallet creation logic here
      const walletClient = await getWalletClient();
      console.log("🚀 | handleCreateAccount | walletClient:", walletClient);
      const smartAccount = await getSmartClient(walletClient as any);
      console.log("🚀 | handleCreateAccount | smartAccount:", smartAccount);
      // Example: await reown.createWallet(username);
    } catch (error) {
      console.error("Failed to create wallet:", error);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="flex flex-col gap-6 w-full max-w-sm">
  <!-- <appkit-button></appkit-button> -->
  <MagicLoginButton />
  <div class="flex flex-col gap-2">
    <Label for="username">Username</Label>
  </div>

  <Button on:click={handleCreateAccount} class="w-full">
    <Wallet class="mr-2 h-4 w-4" />
    {isLoading ? "Creating..." : "Create Wallet"}
  </Button>
</div>
