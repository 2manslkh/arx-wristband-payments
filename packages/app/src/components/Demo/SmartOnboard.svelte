<script lang="ts">
  import { onMount } from 'svelte';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { CreditCard, Loader2, Wallet, ExternalLink } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { createPublicClient, http, type Address, formatEther, type LocalAccount } from 'viem';
  import { baseSepolia } from 'viem/chains';
  import type { StatusCallbackDetails } from '@arx-research/libhalo/types';
  import { tokenAddress } from '../../generated';
  import { retrieveHaloAccount } from '$lib/smartAccount/haloAccount';
  import { smartDemo } from '$lib/smartAccount/smartAccount';
  import { getHaloAddress, getSmartAccountAddress } from '$stores/account.svelte';
  import { getStatus, getTransactionLink } from '$stores/status.svelte';
  import { UserAddresses, UserBalance } from '$components/User';

  // Reactive variables
  let statusMessage = '';

  let haloEthBalance = '0';
  let haloCoinBalance = '0';
  let smartEthBalance = '0';
  let smartCoinBalance = '0';
  let introText = 'Welcome to ZuPay';
  let showNfcIcon = false;
  let showBalanceInfo = false;
  let showStartButton = true;
  let isLoading = false;
  let linkHref = '';
  let linkText = '';

  function showStatus(message: string) {
    statusMessage = message;
    // You might want to add logic here to show/hide the status message
  }

  function showLink(txHash: string) {
    linkHref = `https://sepolia.basescan.org/tx/${txHash}`;
    linkText = 'View transaction';
  }

  function updateStatus(status: string, execMethod: StatusCallbackDetails) {
    console.info(status, execMethod);
    const messages: { [key: string]: string } = {
      init: ' ',
      again: 'Processing (1/1).',
      retry: 'Processing (1/1)..',
      finished: 'Processing (1/1)...',
    };

    showStatus(messages[status] || `${status}, ${execMethod}`);
  }

  async function startOnboarding() {
    isLoading = true;
    try {
      const wallet = (await retrieveHaloAccount()) as LocalAccount;
      console.log('🚀 | startOnboarding | wallet:', wallet);

      showStatus('Creating smart account...');

      await smartDemo(wallet);

      showStatus('Smart account created successfully!');

      await displayBalance(wallet.address);
    } catch (error) {
      console.error('Onboarding failed:', error);
      showStatus(`Onboarding Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      isLoading = false;
    }
  }

  async function displayBalance(haloAddress: Address) {
    try {
      const client = createPublicClient({
        chain: baseSepolia,
        transport: http('https://sepolia.base.org'),
      });

      // Get ETH balances
      const [haloBalance, smartBalance] = await Promise.all([
        client.getBalance({ address: haloAddress }),
        client.getBalance({ address: getSmartAccountAddress() }),
      ]);

      haloEthBalance = formatEther(haloBalance);
      smartEthBalance = formatEther(smartBalance);

      // Get COIN balances
      const coinContractAddress = tokenAddress[84532];
      const coinAbi = [
        {
          name: 'balanceOf',
          type: 'function',
          inputs: [{ name: 'account', type: 'address' }],
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'view',
        },
      ];

      const [haloCoinBalanceWei, smartCoinBalanceWei] = await Promise.all([
        client.readContract({
          address: coinContractAddress,
          abi: coinAbi,
          functionName: 'balanceOf',
          args: [haloAddress],
        }),
        client.readContract({
          address: coinContractAddress,
          abi: coinAbi,
          functionName: 'balanceOf',
          args: [getSmartAccountAddress()],
        }),
      ]);

      haloCoinBalance = formatEther(haloCoinBalanceWei as bigint);
      smartCoinBalance = formatEther(smartCoinBalanceWei as bigint);

      introText = 'Welcome Back,';
      showNfcIcon = false;
      showBalanceInfo = true;
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      showStatus('Failed to fetch balance');
    }
  }

  function handleBeginRequest() {
    showStartButton = false;
    introText = 'Tap your NFC Wristband to continue!';
    setTimeout(() => {
      showNfcIcon = true;
      startOnboarding();
    }, 500);
  }

  function truncateAddress(address: string | null | undefined) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  onMount(() => {});
</script>

<Card.Root class="mt-8">
  <Card.Header>
    <Card.Title class="text-2xl text-center">{introText}</Card.Title>
    {#if getHaloAddress()}
      <Card.Description class="text-center text-lg font-mono">
        <UserAddresses />
      </Card.Description>
    {/if}
  </Card.Header>

  <Card.Content class="flex flex-col items-center gap-6">
    {#if showNfcIcon}
      <div class="p-8 rounded-full bg-primary/10 animate-pulse">
        <CreditCard class="w-12 h-12 text-primary" />
      </div>
    {/if}

    {#if showBalanceInfo}
      <UserBalance {haloEthBalance} {haloCoinBalance} {smartEthBalance} {smartCoinBalance} />
    {/if}

    {#if showStartButton}
      <Button class="w-full" on:click={handleBeginRequest} disabled={isLoading}>
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
