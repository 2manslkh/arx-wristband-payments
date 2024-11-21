<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ArrowBigLeft, X } from "lucide-svelte";

  let { amount = $bindable("0") } = $props();

  function addDigit(digit: string) {
    if (amount === "0") {
      amount = digit;
    } else {
      amount += digit;
    }
  }

  function addDecimal() {
    if (!amount.includes(".")) {
      amount += ".";
    }
  }

  function backspace() {
    if (amount.length > 1) {
      amount = amount.slice(0, -1);
    } else {
      amount = "0";
    }
  }

  function clear() {
    amount = "0";
  }
</script>

<div class="w-full max-w-xs mx-auto">
  <div class="text-center mb-4">
    <div class="text-4xl font-bold">{amount}</div>
    <div class="text-sm text-muted-foreground">TOKEN</div>
  </div>

  <div class="grid grid-cols-3 gap-2">
    {#each Array(9) as _, i}
      <Button
        variant="outline"
        class="h-14 text-xl"
        on:click={() => addDigit((i + 1).toString())}
      >
        {i + 1}
      </Button>
    {/each}

    <Button variant="outline" class="h-14 text-xl" on:click={clear}>
      <X class="h-6 w-6" />
    </Button>

    <Button
      variant="outline"
      class="h-14 text-xl"
      on:click={() => addDigit("0")}
    >
      0
    </Button>

    <Button variant="outline" class="h-14 text-xl" on:click={addDecimal}>
      .
    </Button>
  </div>

  <Button variant="destructive" class="w-full mt-2 h-14" on:click={backspace}>
    <ArrowBigLeft class="h-6 w-6" />
  </Button>
</div>
