<script lang="ts" module>
  import { renderable, renderer, type InitialRenderables } from "../../release";
  import type { ExtractRenderableSnippets } from "../../release/SnippetRenderer.svelte";

  export class Model {
    /**
     * Utilize the `renderable.required` sentinel
     * to indicate this renderable should be provided to the constructor.
     * */
    items = renderable("multi", renderable.required);

    /**
     * @param initial Is not required (thus the `?`) since `multi` renderables
     * will default to an empty array if not explicitly provided
     * (NOTE: this is different from `single` required renderables).
     *
     * However, it's recommended to require it for clarity,
     */
    constructor(initial: InitialRenderables<Model, "items">) {
      renderable.init(this, initial);
    }
  }
</script>

<script lang="ts">
  let { model }: { model: Model } = $props();
</script>

(length: {model.items.current.length})

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
