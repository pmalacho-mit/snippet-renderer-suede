<script lang="ts">
  import Comp, { Model } from "$lib/WithSnippetRenderer.svelte";

  let model = new Model({
    renderables: (render) => ({
      items: render(hi, "everyone!"),
    }),
  });
</script>

{#snippet hi(x: string)}
  <div>hello {x}</div>
{/snippet}

<Comp {model} />
