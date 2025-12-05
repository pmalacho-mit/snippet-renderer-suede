<script lang="ts" module>
  import {
    renderable,
    renderer,
    type InitialRenderables,
  } from "../../../release";

  export class Model {
    items = renderable("multi");

    constructor(initial?: InitialRenderables<Model>) {
      renderable.init(this, initial);
    }
  }
</script>

<script lang="ts">
  let { model }: { model: Model } = $props();
  const text = $derived(model.items.current !== undefined ? "Yes" : "No");
</script>

<em>Have you provided a renderable?</em> <strong>{text}</strong>
{#if model.items.current}
  <div>
    {@render renderer(model.items.current)}
  </div>
  <div>
    Wrapped:
    {#each model.items.current as item, index}
      {@const suffix = index < model.items.current.length - 1 ? ", " : ""}
      <strong>
        {@render renderer(item)}{suffix}
      </strong>
    {/each}
  </div>
{/if}
