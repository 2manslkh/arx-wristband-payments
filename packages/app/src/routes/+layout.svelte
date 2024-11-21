<script lang="ts">
  import "../app.css";
  import { TopNavBar } from "$components/TopNavBar";
  import { startWatching } from "$lib/wagmi/watcher.svelte";
  import { onMount } from "svelte";
  import { reconnect } from "@wagmi/core";
  import { wagmiConfig } from "$lib/wagmi";
  let { children } = $props();

  onMount(() => {
    reconnect(wagmiConfig);
  });
</script>

<div class="min-h-screen flex flex-col">
  <!-- Header -->
  <header class="border-b">
    <TopNavBar />
  </header>

  <!-- Main Content -->
  <main class="container mx-auto px-4 py-8 flex-1">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="border-t">
    <div class="container mx-auto px-4 py-6 text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} My App. All rights reserved.</p>
    </div>
  </footer>
</div>
