<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Wallet, ExternalLink, Key, LogOut, LogIn } from 'lucide-svelte';
  import {
    getSmartAccount,
    getSmartAccountAddress,
    setSmartAccount,
    setSmartAccountAddress,
  } from '$stores/account.svelte';
  import { getPasskeySmartClient, signMessageWithSmartPasskeyClient } from '$lib/smartAccount/smartAccount';
  import { signup, logout, login, getIsAuthenticated } from '$stores/auth.svelte';
  import { hasStoredPasskey } from '$lib/smartAccount/storage';

  let isLoading = $state(false);
  let error = $state<string | null>(null);
  let storedPasskey = $state(false);
  let isAuthenticated = getIsAuthenticated();
  let smartAccountAddress = $derived(getSmartAccountAddress());
  let signedMessage = $state<string | null>(null);

  // Check for stored passkey on mount
  $effect(() => {
    storedPasskey = hasStoredPasskey();
  });

  async function handleCreatePasskey() {
    try {
      isLoading = true;
      error = null;
      await signup('Zupay 1');
      await handleCreateSmartAccount();
    } catch (err) {
      console.error('Failed to create passkey:', err);
      error = 'Failed to create passkey. Please try again.';
    } finally {
      isLoading = false;
    }
  }

  async function handleLogin() {
    try {
      isLoading = true;
      error = null;
      await login();
      await handleCreateSmartAccount();
    } catch (err) {
      console.error('Login failed:', err);
      error = 'Login failed. Please try again.';
    } finally {
      isLoading = false;
    }
  }

  async function handleCreateSmartAccount() {
    try {
      isLoading = true;
      error = null;

      const smartAccount = await getPasskeySmartClient();
      setSmartAccount(smartAccount);

      if (smartAccount?.account?.address) {
        setSmartAccountAddress(smartAccount.account.address);
      }
    } catch (err) {
      console.error('Failed to create smart account:', err);
      error = 'Failed to create smart account. Please try again.';
    } finally {
      isLoading = false;
    }
  }

  function handleLogout() {
    logout();
    setSmartAccount(undefined);
    setSmartAccountAddress(undefined);
  }

  function openEtherscan(address: `0x${string}`) {
    window.open(`https://sepolia.basescan.org/address/${address}`, '_blank');
  }

  async function handleSignMessage() {
    try {
      isLoading = true;
      error = null;
      const signature = await signMessageWithSmartPasskeyClient();
      signedMessage = signature;
    } catch (err) {
      console.error('Failed to sign message:', err);
      error = 'Failed to sign message. Please try again.';
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="flex flex-col gap-6 w-full max-w-sm">
  {#if error}
    <div class="p-4 rounded-lg bg-destructive/15 text-destructive text-sm">
      {error}
    </div>
  {/if}

  {#if !smartAccountAddress}
    <div class="space-y-4">
      <div class="text-center">
        <h2 class="text-lg font-semibold">Create or Login with Passkey</h2>
        <p class="text-sm text-muted-foreground">Create a new passkey or login with an existing one</p>
      </div>

      <Button on:click={handleCreatePasskey} class="w-full" disabled={isLoading}>
        <Key class="mr-2 h-4 w-4" />
        {isLoading ? 'Creating Passkey...' : 'Create New Passkey'}
      </Button>

      {#if storedPasskey}
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t" />
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button on:click={handleLogin} variant="outline" class="w-full" disabled={isLoading}>
          <LogIn class="mr-2 h-4 w-4" />
          {isLoading ? 'Logging in...' : 'Login with Existing Passkey'}
        </Button>
      {/if}
    </div>
  {:else}
    <div class="space-y-4">
      <div class="text-center">
        <h2 class="text-lg font-semibold">Smart Account Created</h2>
        <p class="text-sm text-muted-foreground break-all">
          Address: {smartAccountAddress}
        </p>
      </div>

      <div class="flex gap-2 flex-col">
        <div class="flex gap-2">
          {#if smartAccountAddress}
            <Button variant="outline" class="flex-1" on:click={() => openEtherscan(smartAccountAddress)}>
              <ExternalLink class="mr-2 h-4 w-4" />
              View on Explorer
            </Button>
          {/if}

          <Button variant="destructive" class="flex-1" on:click={handleLogout}>
            <LogOut class="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Button variant="secondary" class="w-full" on:click={handleSignMessage} disabled={isLoading}>
          <Key class="mr-2 h-4 w-4" />
          {isLoading ? 'Signing...' : 'Sign Message'}
        </Button>

        {#if signedMessage}
          <p class="text-sm text-muted-foreground break-all">
            Signature: {signedMessage}
          </p>
        {/if}
      </div>
    </div>
  {/if}
</div>
