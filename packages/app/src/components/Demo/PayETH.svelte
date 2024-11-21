<script lang="ts">
  import { onMount } from "svelte";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { CreditCard, Loader2 } from "lucide-svelte";
  import { cn } from "$lib/utils";
  import {
    createPublicClient,
    http,
    parseEther,
    serializeTransaction,
    keccak256,
    createWalletClient,
    type TransactionSerializable,
    type Signature,
  } from "viem";
  import { base, baseSepolia } from "viem/chains";
  import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";
  import type { StatusCallbackDetails } from "@arx-research/libhalo/types";

  // Constants
  const amount = "0.00001";
  const recipientAddress = "0x985A29E88E75394DbDaE41a269409f701ccf6a43";
  const baseRpcUrl = "https://sepolia.base.org";

  // Create Viem client
  const publicClient = createPublicClient({
    chain: base,
    transport: http(baseRpcUrl),
  });

  // Reactive variables
  let status = "";
  let txLink = "";

  // Function to show status
  function showStatus(message: string) {
    status = message;
    // You can add logic here to remove the status after a certain time if needed
  }

  // Function to show transaction link
  function showLink(txHash: string) {
    txLink = `https://sepolia.basescan.org/tx/${txHash}`;
  }

  // Status update functions
  function updateStatus(status: string, execMethod: StatusCallbackDetails) {
    console.info(status, execMethod);
    const messages: { [key: string]: string } = {
      init: "Please tap your Halo card to the back of your smartphone.",
      again: "Processing (1/2)..",
      retry: "There was an error. Please try tapping your card again.",
      finished: "Processing (1/2)...",
    };
    showStatus(messages[status] || `${status}, ${execMethod}`);
  }

  function updateStatusPhase2(
    status: string,
    execMethod: StatusCallbackDetails
  ) {
    console.info(status, execMethod);
    const messages: { [key: string]: string } = {
      init: "Processing (2/2).",
      again: "Processing (2/2)..",
      retry: "There was an error. Please try tapping your card again.",
      finished: "Processing (2/2)...",
    };
    showStatus(messages[status] || `${status}, ${execMethod}`);
  }

  // Add loading state
  let isLoading = false;

  // Main payment function
  async function handlePayment() {
    isLoading = true;
    try {
      const nfcResult = await execHaloCmdWeb(
        { name: "get_pkeys" },

        {
          method: "webnfc",
          statusCallback: updateStatus,
        }
      );

      const [nonce, gasPrice] = await Promise.all([
        publicClient.getTransactionCount({
          address: nfcResult.etherAddresses["1"],
        }),
        publicClient.getGasPrice(),
      ]);

      const transaction: TransactionSerializable = {
        to: recipientAddress,
        value: parseEther(amount),
        nonce,
        gas: 21000n,
        gasPrice,
        chainId: baseSepolia.id,
      };

      const serializedTx = serializeTransaction(transaction);
      const digest = keccak256(serializedTx).slice(2);

      const signedTxResult = await execHaloCmdWeb(
        { name: "sign", digest, keyNo: 1 },
        {
          method: "webnfc",
          statusCallback: updateStatusPhase2,
        }
      );

      const signature: Signature = {
        r: `0x${signedTxResult.signature.raw.r}`,
        s: `0x${signedTxResult.signature.raw.s}`,
        v: BigInt(signedTxResult.signature.raw.v),
      };

      const walletClient = createWalletClient({
        chain: baseSepolia,
        transport: http(baseRpcUrl),
      });

      const hash = await walletClient.sendRawTransaction({
        serializedTransaction: serializeTransaction(transaction, signature),
      });

      showStatus("Confirming on blockchain...");
      await publicClient.waitForTransactionReceipt({ hash });
      showStatus("Payment Successful!");
      showLink(hash);
    } catch (error) {
      console.error("Payment failed:", error);
      if (error instanceof Error) {
        showStatus(`Payment Failed: ${error.message}`);
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
    <Card.Title class="text-2xl text-center">EasyPay on Base</Card.Title>
    <Card.Description class="text-3xl font-bold text-center">
      {amount} ETH
    </Card.Description>
  </Card.Header>

  <Card.Content class="flex flex-col items-center gap-6">
    <div class="p-8 rounded-full bg-primary/10">
      <CreditCard class="w-12 h-12 text-primary" />
    </div>

    <Button class="w-full" disabled={isLoading} on:click={handlePayment}>
      {#if isLoading}
        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
      {/if}
      Pay
    </Button>

    {#if status}
      <div class="w-full max-h-24 overflow-y-auto">
        <p
          class={cn(
            "text-sm text-center break-words whitespace-pre-wrap",
            status.includes("Failed")
              ? "text-destructive"
              : "text-muted-foreground"
          )}
        >
          {status}
        </p>
      </div>
    {/if}

    {#if txLink}
      <Button variant="link" class="mt-2">
        <a href={txLink} target="_blank" rel="noopener noreferrer">
          View transaction
        </a>
      </Button>
    {/if}
  </Card.Content>
</Card.Root>
