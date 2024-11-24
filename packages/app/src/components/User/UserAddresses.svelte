<script lang="ts">
  import { getBlockExplorerAddressUrl } from '$lib/util/blockExplorer';
  import { shortenAddress } from '$lib/util/shortenAddress';
  import { getHaloAddress, getSmartAccountAddress } from '$stores/account.svelte';
</script>

<div class="flex flex-col gap-1">
  <span>
    Halo:
    <a
      href={getBlockExplorerAddressUrl(getHaloAddress())}
      target="_blank"
      rel="noopener noreferrer"
      class="hover:text-primary transition-colors">
      {shortenAddress(getHaloAddress())}
    </a>
  </span>
  <span>
    Smart:
    <a
      href={getBlockExplorerAddressUrl(getSmartAccountAddress())}
      target="_blank"
      rel="noopener noreferrer"
      class="hover:text-primary transition-colors">
      {shortenAddress(getSmartAccountAddress())}
    </a>
  </span>
</div>
