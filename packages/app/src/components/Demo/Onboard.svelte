<script lang="ts">
  import { onMount } from "svelte";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { CreditCard, Loader2, Wallet } from "lucide-svelte";
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
    type Address,
    formatEther,
  } from "viem";
  import { base, baseSepolia } from "viem/chains";
  import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";
  import type { StatusCallbackDetails } from "@arx-research/libhalo/types";
  import { tokenAddress } from "../../generated";

  // Reactive variables
  let statusMessage = "";
  let linkHref = "";
  let linkText = "";
  let ethBalance = "0";
  let coinBalance = "0";
  let introText = "Welcome to ZuPay";
  let showNfcIcon = false;
  let ethAddress = "";
  let showBalanceInfo = false;
  let showStartButton = true;
  let isLoading = false;

  function showStatus(message: string) {
    statusMessage = message;
    // You might want to add logic here to show/hide the status message
  }

  function showLink(txHash: string) {
    linkHref = `https://sepolia.basescan.org/tx/${txHash}`;
    linkText = "View transaction";
  }

  function updateStatus(status: string, execMethod: StatusCallbackDetails) {
    console.info(status, execMethod);
    const messages: { [key: string]: string } = {
      init: " ",
      again: "Processing (1/1).",
      retry: "Processing (1/1)..",
      finished: "Processing (1/1)...",
    };

    showStatus(messages[status] || `${status}, ${execMethod}`);
  }

  async function startOnboarding() {
    isLoading = true;
    try {
      showStatus("Processing faucet request...");

      const nfcResult = await execHaloCmdWeb(
        { name: "get_pkeys" },
        { statusCallback: updateStatus, method: "webnfc" }
      );

      const recipientAddress = nfcResult.etherAddresses["1"];

      showStatus("Onboarding...");

      const response = await fetch("/api/faucet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiver: recipientAddress }),
      });

      if (!response.ok) {
        throw new Error("Faucet request failed");
      }
      const { txHash } = await response.json();

      showStatus("Onboarded successfully!");
      showLink(txHash);

      await displayBalance(recipientAddress);
    } catch (error) {
      console.error("Onboarding failed:", error);
      showStatus(
        `Onboarding Failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      isLoading = false;
    }
  }

  async function displayBalance(address: Address) {
    try {
      const client = createPublicClient({
        chain: baseSepolia,
        transport: http("https://sepolia.base.org"),
      });

      const balance = (await client.getBalance({ address })) as bigint;
      ethBalance = formatEther(balance);

      const coinContractAddress = tokenAddress[84532];
      const coinAbi = [
        {
          name: "balanceOf",
          type: "function",
          inputs: [{ name: "account", type: "address" }],
          outputs: [{ name: "", type: "uint256" }],
          stateMutability: "view",
        },
      ];
      const coinBalanceWei = (await client.readContract({
        address: coinContractAddress,
        abi: coinAbi,
        functionName: "balanceOf",
        args: [address],
      })) as bigint;
      coinBalance = formatEther(coinBalanceWei);

      introText = "Welcome Back,";
      showNfcIcon = false;
      ethAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
      showBalanceInfo = true;
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      showStatus("Failed to fetch balance");
    }
  }

  function handleBeginRequest() {
    showStartButton = false;
    introText = "Tap your NFC Wristband to continue!";
    setTimeout(() => {
      showNfcIcon = true;
      startOnboarding();
    }, 500);
  }

  onMount(() => {});
</script>

<Card.Root class="mt-8">
  <Card.Header>
    <Card.Title class="text-2xl text-center">{introText}</Card.Title>
    {#if ethAddress}
      <Card.Description class="text-center text-lg font-mono">
        {ethAddress}
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
      <div class="w-full space-y-4">
        <div
          class="flex items-center justify-between p-4 rounded-lg bg-secondary"
        >
          <div class="flex items-center gap-2">
            <Wallet class="w-5 h-5" />
            <span>ETH Balance</span>
          </div>
          <span class="font-mono">{ethBalance}</span>
        </div>
        <div
          class="flex items-center justify-between p-4 rounded-lg bg-secondary"
        >
          <div class="flex items-center gap-2">
            <Wallet class="w-5 h-5" />
            <span>COIN Balance</span>
          </div>
          <span class="font-mono">{coinBalance}</span>
        </div>
      </div>
    {/if}

    {#if showStartButton}
      <Button class="w-full" on:click={handleBeginRequest} disabled={isLoading}>
        {#if isLoading}
          <Loader2 class="mr-2 h-4 w-4 animate-spin" />
        {/if}
        Begin
      </Button>
    {/if}

    {#if statusMessage}
      <div class="w-full max-h-24 overflow-y-auto">
        <p
          class={cn(
            "text-sm text-center break-words whitespace-pre-wrap",
            statusMessage.toLowerCase().includes("failed")
              ? "text-destructive"
              : "text-muted-foreground"
          )}
        >
          {statusMessage}
        </p>
      </div>
    {/if}

    {#if linkHref}
      <Button variant="link" class="mt-2">
        <a href={linkHref} target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      </Button>
    {/if}
  </Card.Content>
</Card.Root>
