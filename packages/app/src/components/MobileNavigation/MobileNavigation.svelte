<script>
  import MobileNavigationToggle from './MobileNavigationToggle.svelte';
  import { NavigationData } from '$configs/navigation';

  let mobileMenu = false;

  function handleToggle() {
    mobileMenu = !mobileMenu;
  }
</script>

<!-- Overlay -->
<MobileNavigationToggle {mobileMenu} {handleToggle} />

{#if mobileMenu}
  <div class="flex flex-col justify-between z-20 fixed top-0 left-0 h-full w-full bg-primary-background">
    <div class="z-21 flex flex-col h-full gap-[16px] p-4">
      <a class="flex justify-between items-center" href="/">
        <div class="text-[75px]/[100px] lg:text-[40px]/[56px] rainbow-text-and-shadow">Title</div>
      </a>

      <!-- Links -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-6 body-bold">
          {#each NavigationData as data}
            <a href={data.disabled ? '#' : data.url} class={`body-regular w-fit`} on:click={handleToggle}>
              {data.label}
              {#if data.disabled}
                <span class="soon-tag">SOON</span>
              {/if}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .disabled-tag {
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }

  .soon-tag {
    display: flex;
    height: 20px;
    padding: 4px 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 35px;
    background: #9fffea;

    color: #000;
    text-align: center;
    font-family: Montserrat;
    font-size: 8px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 12px */
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
</style>
