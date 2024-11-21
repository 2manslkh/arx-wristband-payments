<script lang="ts">
  import HamburgerIcon from '$images/hamburger.svg';
  import XIcon from '$images/x.svg';
  export let mobileMenu = false;
  export let handleToggle: () => void;
</script>

<button class="h-[20px] w-[20px] fixed z-30 right-4 top-[20px] burger-color" on:click={handleToggle}>
  <!-- <span class="indicator-item badge badge-xs {$account?.isConnected ? 'badge-primary' : 'badge-accent'}"></span> -->
  {#if !mobileMenu}
    <img src={HamburgerIcon} alt="menu" />
  {:else}
    <img src={XIcon} alt="menu" />
  {/if}
</button>

<style>
  .burger-color {
    filter: brightness(0) invert(1);
  }
</style>
