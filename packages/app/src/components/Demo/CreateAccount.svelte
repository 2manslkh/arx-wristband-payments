<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Wallet, ExternalLink, Key, LogOut, LogIn } from 'lucide-svelte';
  import {
    getSafeSmartAccount,
    getSafeSmartAccountAddress,
    getSmartAccount,
    getSmartAccountAddress,
    setSmartAccount,
    setSmartAccountAddress,
  } from '$stores/account.svelte';
  import { getPasskeySmartClient, signMessageWithSmartPasskeyClient } from '$lib/smartAccount/smartAccount';
  import { signup, logout, login, getIsAuthenticated, setSafePasskey, getSafePasskey } from '$stores/auth.svelte';
  import { hasStoredPasskey } from '$lib/smartAccount/storage';
  import { dripToken } from '$lib/smartAccount/smartTransfer';
  import { tokenAddress } from '../../generated';
  import { zeroAddress } from 'viem';
  import {
    createPasskey,
    loadPasskeyFromLocalStorage,
    storePasskeyInLocalStorage,
  } from '$lib/smartAccount/safePasskeys';

  import { Safe4337Pack } from '@safe-global/relay-kit';
  import { getSafeAddress, setIsSafeDeployed, setSafeAddress } from '$stores/safe.svelte';
  import type { PasskeyArgType } from '@safe-global/protocol-kit';
  import { PUBLIC_PIMLICO_API_KEY } from '$env/static/public';
  import { getSafeSmartClient } from '$lib/smartAccount/safeSmartAccount';

  let isLoading = $state(false);
  let error = $state<string | null>(null);
  let storedPasskey = $state(false);
  let isAuthenticated = getIsAuthenticated();
  let smartAccountAddress = $derived(getSmartAccountAddress());
  let safeAddress = $derived(getSafeAddress());
  let safePasskey = $derived(getSafePasskey());
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

      await handleCreateSmartAccount();

      console.log('smart account created');

      const safeSmartAccount = getSafeSmartAccount();
      const safeAddress = getSafeSmartAccountAddress();

      const receiver = '0x88827a6d3693F33Bb4Ab61adc5a880Baa4B333bD';
      console.log('🚀 | handleLogin | receiver:', receiver);

      // Give tokens to the smart account
      // let { success, transactionHash } = await dripToken(safeSmartAccount!, tokenAddress[84532], receiver);
      // console.log('Dripped token to', success, transactionHash);
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

      const smartAccount = await getSafeSmartClient();

      if (smartAccount) {
        setSmartAccountAddress(await smartAccount.protocolKit.getAddress());
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

  async function handleTestTransaction() {
    // Use smart account to send a transaction of 0 ether to target address
    try {
      isLoading = true;
      const smartAccount = getSafeSmartAccount();
      console.log('🚀 | handleTestTransaction | smartAccount:', smartAccount);
      if (!smartAccount) {
        throw new Error('Smart account not found');
      }

      // Define the target address and transaction details
      const targetAddress = '0x88827a6d3693F33Bb4Ab61adc5a880Baa4B333bD';
      console.log('🚀 | handleTestTransaction | targetAddress:', targetAddress);
      const transactionData = {
        to: targetAddress,
        value: '0x0', // Sending 0 ETH
        data: '0x', // No additional data
      };

      // Create the transaction using the Safe smart account
      const transaction = await smartAccount.createTransaction({
        transactions: [transactionData],
      });
      console.log('🚀 | handleTestTransaction | transaction:', transaction);

      const signedTransaction = await smartAccount.signSafeOperation(transaction);
      console.log('🚀 | handleTestTransaction | signedTransaction:', signedTransaction);

      // Submit the transaction
      const result = await smartAccount.executeTransaction({ executable: signedTransaction });

      return result;
    } catch (error) {
      console.error('Error in handleTestTransaction:', error);
      throw error;
    } finally {
      isLoading = false;
    }
  }

  // Safe version
  async function handleSignUp() {
    const passkey = await createPasskey();

    storePasskeyInLocalStorage(passkey);
    setSafePasskey(passkey);

    await showSafeInfo(passkey);
  }

  async function selectExistingPasskey() {
    const passkey = loadPasskeyFromLocalStorage();
    setSafePasskey(passkey);
    await showSafeInfo(passkey);
  }

  async function showSafeInfo(passkey: PasskeyArgType) {
    isLoading = true;
    const safe4337Pack = await Safe4337Pack.init({
      provider: 'https://sepolia.base.org',
      signer: passkey,
      bundlerUrl: `https://api.pimlico.io/v2/base-sepolia/rpc?apikey=${PUBLIC_PIMLICO_API_KEY}`,
      options: {
        owners: [],
        threshold: 1,
      },
    });
    setSafeAddress(await safe4337Pack.protocolKit.getAddress());
    setIsSafeDeployed(await safe4337Pack.protocolKit.isSafeDeployed());
    isLoading = false;
  }
</script>

<div class="flex flex-col gap-6 w-full max-w-sm">
  {#if error}
    <div class="p-4 rounded-lg bg-destructive/15 text-destructive text-sm">
      {error}
    </div>
  {/if}

  {#if !smartAccountAddress && !safeAddress}
    <div class="space-y-4">
      <div class="text-center">
        <h2 class="text-lg font-semibold">Create or Login with Passkey</h2>
        <p class="text-sm text-muted-foreground">Create a new passkey or login with an existing one</p>
      </div>

      <!-- <Button on:click={handleCreatePasskey} class="w-full" disabled={isLoading}>
        <Key class="mr-2 h-4 w-4" />
        {isLoading ? 'Creating Passkey...' : 'Create New Passkey'}
      </Button> -->

      <Button on:click={handleSignUp} class="w-full" disabled={isLoading}>
        <Key class="mr-2 h-4 w-4" />
        {isLoading ? 'Creating Passkey...' : 'Create New Safe Passkey'}
      </Button>
      {#if storedPasskey}
        <div class="relative">
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

        {#if safeAddress}
          <p class="text-sm text-muted-foreground break-all">
            Safe Address: {safeAddress}
          </p>
        {/if}
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

        <Button variant="secondary" class="w-full" on:click={handleTestTransaction} disabled={isLoading}>
          <Key class="mr-2 h-4 w-4" />
          {isLoading ? 'Signing...' : 'Send 0 ETH'}
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
