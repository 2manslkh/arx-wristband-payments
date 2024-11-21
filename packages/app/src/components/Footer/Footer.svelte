<script lang="ts">
  import { SocialsData } from '$configs';
</script>

<div class="flex justify-between items-center container py-4 px-4 bg-primary-background">
  <div class="flex flex-col lg:flex-row w-full items-center lg:items-start lg:justify-between py-6 gap-4">
    <div class="flex flex-row gap-2 lg:gap-2 w-full justify-between">
      <!-- Left Footer -->
      <div class="text-2xl">FOOTER</div>
      <!-- Right Footer -->
      <div class="lg:flex gap-2 lg:gap-8 items-center flex">
        {#each SocialsData as data}
          {#if !data.disabled}
            <a href={data.url} class="w-fit">{data.label}</a>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</div>
