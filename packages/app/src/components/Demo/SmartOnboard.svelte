<script lang="ts">
  import { onMount } from "svelte";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { CreditCard, Loader2, Wallet } from "lucide-svelte";
  import { cn } from "$lib/utils";
  import {
    createPublicClient,
    http,
    type Address,
    formatEther,
    type LocalAccount,
  } from "viem";
  import { base, baseSepolia } from "viem/chains";
  import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";
  import type { StatusCallbackDetails } from "@arx-research/libhalo/types";
  import { tokenAddress } from "../../generated";
  import {
    retrieveHaloAccount,
    retrieveHaloAddress,
  } from "$lib/SmartAccount/HaloAccount";
  import { smartAccount } from "$lib/SmartAccount/SmartAccount";
  import {
    getHaloAddress,
    getSmartAccountAddress,
  } from "$stores/account.svelte";
  import { getStatus } from "$stores/status.svelte";

  // Reactive variables
  let statusMessage = "";

  let ethBalance = "0";
  let coinBalance = "0";
  let introText = "Welcome to EasyPay";
  let showNfcIcon = false;
  let showBalanceInfo = false;
  let showStartButton = true;
  let isLoading = false;
  let linkHref = "";
  let linkText = "";

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
      const haloChipAddress = await retrieveHaloAddress();
      const wallet = (await retrieveHaloAccount()) as LocalAccount;

      showStatus("Creating smart account...");

      await smartAccount(wallet);

      showStatus("Smart account created successfully!");

      await displayBalance(wallet.address);
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

  function truncateAddress(address: string | null | undefined) {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  function getExplorerUrl(address: string) {
    return `https://sepolia.basescan.org/address/${address}`;
  }

  onMount(() => {});
</script>

<Card.Root class="mt-8">
  <Card.Header>
    <Card.Title class="text-2xl text-center">{introText}</Card.Title>
    {#if getHaloAddress()}
      <Card.Description class="text-center text-lg font-mono">
        <div class="flex flex-col gap-1">
          <span>
            Halo:
            <a
              href={getExplorerUrl(getHaloAddress())}
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
            >
              {truncateAddress(getHaloAddress())}
            </a>
          </span>
          <span>
            Smart:
            <a
              href={getExplorerUrl(getSmartAccountAddress())}
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
            >
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

    {#if getStatus()}
      <div class="w-full max-h-24 overflow-y-auto">
        <p
          class={cn(
            "text-sm text-center break-words whitespace-pre-wrap",
            getStatus().toLowerCase().includes("failed")
              ? "text-destructive"
              : "text-muted-foreground"
          )}
        >
          {getStatus()}
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
