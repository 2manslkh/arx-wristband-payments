<script lang="ts">
  import { onMount } from 'svelte';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { CreditCard, Loader2 } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { createPublicClient, http, parseEther, type LocalAccount } from 'viem';
  import { base, baseSepolia } from 'viem/chains';
  import type { StatusCallbackDetails } from '@arx-research/libhalo/types';
  import { retrieveHaloAccount } from '$lib/smartAccount/haloAccount';
  import { getSmartClient } from '$lib/smartAccount/smartAccount';
  import { transferToken } from '$lib/smartAccount/smartTransfer';
  import { tokenAddress } from '../../generated';
  import AmountKeypad from './AmountKeypad.svelte';
  import TransactionLink from './TransactionLink.svelte';

  // Constants
  let amount = $state('0');
  // Add loading state
  let isLoading = $state(false);
  let status = $state('');
  let txLink = $state('');
  const recipientAddress = '0x88827a6d3693F33Bb4Ab61adc5a880Baa4B333bD';
  const baseRpcUrl = 'https://sepolia.base.org';

  // Create Viem client
  const publicClient = createPublicClient({
    chain: base,
    transport: http(baseRpcUrl),
  });

  // Reactive variables

  // Function to show status
  function showStatus(message: string) {
    status = message;
    // You can add logic here to remove the status after a certain time if needed
  }

  // Function to show transaction link
  function showLink(txHash: string) {
    txLink = `https://sepolia.basescan.org/tx/${txHash}`;
  }

  // Main payment function
  async function handlePayment() {
    isLoading = true;
    try {
      const wallet = (await retrieveHaloAccount()) as LocalAccount;
      const smartAccount = await getSmartClient(wallet);

      const { transactionHash } = await transferToken(
        smartAccount,
        tokenAddress[84532] as `0x${string}`,
        recipientAddress,
        parseEther(amount),
      );

      if (!transactionHash) {
        throw new Error('Transaction hash is undefined');
      }

      showStatus('Confirming on blockchain...');
      await publicClient.waitForTransactionReceipt({ hash: transactionHash });
      showStatus('Payment Successful!');
      showLink(transactionHash);
    } catch (error) {
      console.error('Payment failed:', error);
      if (error instanceof Error) {
        showStatus(`Payment Failed: ${error.message}`);
      } else {
        showStatus('Payment Failed: Unknown error');
      }
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    // Any initialization code can go here
  });
</script>

<Card.Root class="mt-8">
  <Card.Header>
    <Card.Title class="text-2xl text-center">ZuPay on Base</Card.Title>
  </Card.Header>

  <Card.Content class="flex flex-col items-center gap-6">
    <AmountKeypad bind:amount />

    <div class="p-8 rounded-full bg-primary/10">
      <CreditCard class="w-12 h-12 text-primary" />
    </div>

    <Button class="w-full" disabled={isLoading || !amount || amount === '0'} on:click={handlePayment}>
      {#if isLoading}
        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
      {/if}
      Pay
    </Button>

    {#if status}
      <div class="w-full max-h-24 overflow-y-auto">
        <p
          class={cn(
            'text-sm text-center break-words whitespace-pre-wrap',
            status.toLowerCase().includes('failed') ? 'text-destructive' : 'text-muted-foreground',
          )}>
          {status}
        </p>
      </div>
    {/if}

    {#if txLink}
      <TransactionLink href={txLink} />
    {/if}
  </Card.Content>
</Card.Root>
