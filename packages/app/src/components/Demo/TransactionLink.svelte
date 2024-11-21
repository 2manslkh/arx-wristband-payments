<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ExternalLink } from "lucide-svelte";

  let { href = $bindable<string>("") } = $props();
</script>

<Button variant="link" class="mt-2 group">
  <a
    {href}
    target="_blank"
    rel="noopener noreferrer"
    class="flex items-center gap-1.5 hover:text-primary transition-colors"
  >
    View transaction
    <ExternalLink class="w-3 h-3" />
  </a>
</Button>
