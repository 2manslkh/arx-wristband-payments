<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Mail } from "lucide-svelte";
  import { magic } from "../../lib/connect/magic";

  let loading = $state(false);
  let error = $state<string | null>(null);

  async function handleLogin() {
    try {
      loading = true;
      error = null;
      // await magic.webauthn.registerNewUser({ username: "username" });
      magic.wallet.showUI();
    } catch (err) {
      error = "Failed to send login link. Please try again.";
    } finally {
      loading = false;
    }
  }
</script>

<div class="flex flex-col gap-4 w-full max-w-sm">
  <div class="flex flex-col gap-2">
    {#if error}
      <p class="text-sm text-destructive">{error}</p>
    {/if}
  </div>

  <Button on:click={handleLogin} variant="default" class="w-full">
    {#if loading}
      <span class="animate-spin mr-2">◌</span>
    {:else}
      <Mail class="w-4 h-4 mr-2" />
    {/if}
    {loading ? "Sending Magic Link..." : "Login with Email"}
  </Button>
</div>
