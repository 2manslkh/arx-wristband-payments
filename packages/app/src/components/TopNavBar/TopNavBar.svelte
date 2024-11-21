<script lang="ts">
  import TopNavBar from "./TopNavBar.template.svelte";
  import { NavigationData, SocialsData } from "$configs";
</script>

{#snippet logoSnippet()}
  <a href="/" class="text-2xl font-semibold">Title</a>
{/snippet}

{#snippet rightSectionSnippet()}
  <appkit-button> </appkit-button>
  <div class="lg:flex gap-2 lg:gap-8 items-center flex"></div>
{/snippet}

<TopNavBar
  logoContent={logoSnippet}
  rightSectionContent={rightSectionSnippet}
/>
