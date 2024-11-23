<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { CreditCard, Loader2, ExternalLink } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import type { LocalAccount } from 'viem';

  import { retrieveHaloAccount, retrieveHaloAddress } from '$lib/smartAccount/haloAccount';
  import { getSmartClient } from '$lib/smartAccount/smartAccount';
  import { getHaloAddress, getSmartAccountAddress } from '$stores/account.svelte';
  import { getStatus, getTransactionLink, setStatus } from '$stores/status.svelte';
  import { registerENS, setPrimaryName } from '$lib/ens/ens';
  import { wagmiConfig } from '$lib/wagmi';

  // Reactive variables
  let isValidUsername = $state(false);
  let isLoading = $state(false);
  let mintedEnsName = $state('');
  let showStartButton = $state(true);
  let showNfcIcon = $state(false);
  let introText = $state('Welcome to ZuPay');
  let username = $state('');

  function validateUsername(value: string) {
    const validPattern = /^[a-z0-9-]+$/;
    isValidUsername = value.length >= 3 && value.length <= 20 && validPattern.test(value);
    return isValidUsername;
  }

  async function mintEns() {
    isLoading = true;
    try {
      if (!validateUsername(username)) {
        throw new Error('Invalid username. Use only lowercase letters, numbers, and hyphens (3-20 characters)');
      }

      const wallet = (await retrieveHaloAccount()) as LocalAccount;
      const smartAccountClient = await getSmartClient(wallet);

      const ensName = `${username}.zupay.eth`;
      setStatus(`Registering ${ensName}...`);

      await registerENS(wagmiConfig, smartAccountClient, ensName, wallet.address);
      await setPrimaryName(wagmiConfig, ensName);

      mintedEnsName = ensName;
      setStatus('ENS name created successfully!');
    } catch (error) {
      console.error('Onboarding failed:', error);
      setStatus(`Registration Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      isLoading = false;
    }
  }

  function handleBeginRequest() {
    showStartButton = false;
    introText = 'Tap your NFC Wristband to continue!';
    setTimeout(() => {
      showNfcIcon = true;
      mintEns();
    }, 500);
  }

  function truncateAddress(address: string | null | undefined) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  function getExplorerUrl(address: string) {
    return `https://sepolia.basescan.org/address/${address}`;
  }
</script>

<Card.Root class="mt-8">
  <Card.Header>
    <Card.Title class="text-2xl text-center">{introText}</Card.Title>
    {#if showStartButton}
      <div class="w-full max-w-sm mx-auto mt-4">
        <Label for="username">Choose your username</Label>
        <div class="relative mt-1.5">
          <Input
            id="username"
            type="text"
            bind:value={username}
            on:input={(e) => validateUsername(e.currentTarget.value)}
            placeholder="username"
            class="pr-16" />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
            .zupay.eth
          </div>
        </div>
        <p class="text-xs text-muted-foreground mt-1">Use lowercase letters, numbers, and hyphens (3-20 characters)</p>
      </div>
    {/if}

    {#if getHaloAddress()}
      <Card.Description class="text-center text-lg font-mono">
        <div class="flex flex-col gap-1">
          <span>
            Halo:
            <a
              href={getExplorerUrl(getHaloAddress())}
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors">
              {truncateAddress(getHaloAddress())}
            </a>
          </span>
          <span>
            Smart:
            <a
              href={getExplorerUrl(getSmartAccountAddress())}
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors">
              {truncateAddress(getSmartAccountAddress())}
            </a>
          </span>
        </div>
      </Card.Description>
    {/if}
  </Card.Header>

  <Card.Content class="flex flex-col items-center gap-6">
    {#if showNfcIcon}
      <div class="p-8 rounded-full bg-primary/10 animate-pulse">
        <CreditCard class="w-12 h-12 text-primary" />
      </div>
    {/if}

    {#if mintedEnsName}
      <div class="w-full p-4 rounded-lg bg-primary/10 space-y-2">
        <h3 class="text-sm font-medium text-center text-primary">ENS Name Minted Successfully</h3>
        <div class="flex items-center justify-center gap-2">
          <span class="font-mono text-lg">{mintedEnsName}</span>
          <a
            href={`https://sepolia.etherscan.io/enslookup-search?search=${mintedEnsName}`}
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:text-primary/80 transition-colors">
            <ExternalLink class="w-4 h-4" />
          </a>
        </div>
      </div>
    {/if}

    {#if showStartButton}
      <Button class="w-full" on:click={handleBeginRequest} disabled={isLoading || !isValidUsername}>
        {#if isLoading}
          <Loader2 class="mr-2 h-4 w-4 animate-spin" />
        {/if}
        Begin
      </Button>
    {/if}

    {#if getStatus()}
      <div class="w-full max-h-24 overflow-y-auto">
        <p
          class={cn(
            'text-sm text-center break-words whitespace-pre-wrap',
            getStatus().toLowerCase().includes('failed') ? 'text-destructive' : 'text-muted-foreground',
          )}>
          {getStatus()}
        </p>
      </div>
    {/if}

    {#if getTransactionLink()}
      <Button variant="link" class="mt-2 group">
        <a
          href={getTransactionLink()}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 hover:text-primary transition-colors">
          See Transaction
          <ExternalLink class="w-3 h-3" />
        </a>
      </Button>
    {/if}
  </Card.Content>
</Card.Root>
