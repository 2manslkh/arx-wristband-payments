<script lang="ts">
  import { onMount } from "svelte";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "$lib/components/ui/tabs";
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
  import { PayETH, PayToken } from "$components/Demo";
  import Onboard from "$components/Demo/Onboard.svelte";
  import SmartOnboard from "$components/Demo/SmartOnboard.svelte";

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

<div class="container mx-auto max-w-md p-4">
  <Tabs value="demo" class="w-full">
    <TabsList class="grid w-full grid-cols-4">
      <TabsTrigger value="onboard" class="cursor-pointer">Onboard</TabsTrigger>
      <TabsTrigger value="demo" class="cursor-pointer">Demo</TabsTrigger>
      <TabsTrigger value="demo token" class="cursor-pointer">
        Demo Token
      </TabsTrigger>

      <TabsTrigger value="smart account" class="cursor-pointer">
        Smart Account
      </TabsTrigger>
    </TabsList>

    <TabsContent value="onboard">
      <Onboard />
    </TabsContent>

    <TabsContent value="demo">
      <PayETH />
    </TabsContent>

    <TabsContent value="demo token">
      <PayToken />
    </TabsContent>

    <TabsContent value="smart account">
      <SmartOnboard />
    </TabsContent>
  </Tabs>
</div>
