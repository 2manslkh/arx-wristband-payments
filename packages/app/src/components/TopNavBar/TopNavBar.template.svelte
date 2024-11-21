<script lang="ts">
  let { logoContent, rightSectionContent } = $props();
</script>

<div class="flex justify-between items-center container py-4 px-4">
  <!-- Left Section -->
  <div class="w-full">
    {@render logoContent()}
  </div>
  <!-- Middle Section -->
  <!-- <div class="flex items-center justify-center h-10 gap-4 lg:gap-8 body-bold">
    {#each navLinks as data}
      <a href={data.url} class="w-fit">{data.label}</a>
    {/each}
  </div> -->

  <!-- Right Section -->
  <div class="lg:flex gap-2 lg:gap-8 items-center flex w-full justify-end">
    {@render rightSectionContent()}
  </div>
</div>
