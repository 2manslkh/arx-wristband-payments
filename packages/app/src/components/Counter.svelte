<script lang="ts">
  import { counter } from "$stores";
  import { fly } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { writeCounterIncrement } from "../generated";
  import { wagmiConfig } from "$lib/wagmi";
  import {
    getAccount,
    switchChain,
    waitForTransactionReceipt,
  } from "@wagmi/core";
  import { web3modal } from "$lib/connect";
  import { hardhat } from "@wagmi/core/chains";

  let direction = $state(0);
  const displayNumber = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  $effect(() => {
    const count = counter.get();
    displayNumber.set(count);
  });

  async function updateCounter() {
    const previousCount = counter.get();
    const newCount = previousCount + 1;
    const account = getAccount(wagmiConfig);

    if (!account?.address) {
      await web3modal.adapter?.connectionControllerClient?.disconnect();
      throw new Error("Account not found");
    }

    // Switch chain to hardhat
    await switchChain(wagmiConfig, {
      chainId: hardhat.id,
    });

    const tx = await writeCounterIncrement(wagmiConfig, {
      address: account.address,
    });

    const receipt = await waitForTransactionReceipt(wagmiConfig, {
      hash: tx,
    });

    if (receipt.status === "success") {
      direction = 1;
      counter.set(newCount);
    }
  }
</script>

<Card class="w-[350px]">
  <CardHeader>
    <CardTitle>Counter Demo</CardTitle>
  </CardHeader>
  <CardContent class="flex flex-col gap-4">
    <div
      class="text-center text-4xl font-bold h-16 flex items-center justify-center overflow-hidden"
    >
      <span class="tabular-nums">
        {#if Number.isInteger($displayNumber)}
          {$displayNumber}
        {:else}
          {$displayNumber.toFixed(1)}
        {/if}
      </span>
    </div>
    <Button
      variant="default"
      on:click={updateCounter}
      class="transition-all duration-200 hover:scale-105 active:scale-95"
    >
      Increment
    </Button>
  </CardContent>
</Card>
