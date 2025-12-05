<script lang="ts" module>
  import {
    renderable,
    renderer,
    type RenderableSnippet,
    type InitialRenderables,
  } from "../../../release";

  export class Model {
    items = renderable<{ title: string; renderable: RenderableSnippet }>(
      "multi",
      renderable.required
    );

    constructor(initial: InitialRenderables<Model>) {
      renderable.init(this, initial);
    }
  }
</script>

<script lang="ts">
  let { model }: { model: Model } = $props();
</script>

<div>
  {#each model.items.current as { title, renderable }, index}
    <h2>{title}</h2>
    {@render renderer(renderable)}
    {#if index < model.items.current.length - 1}
      <hr />
    {/if}
  {/each}
</div>
