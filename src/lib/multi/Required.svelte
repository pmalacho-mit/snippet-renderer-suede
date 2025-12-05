<script lang="ts" module>
  import {
    renderable,
    renderer,
    type InitialRenderables,
  } from "../../../release";

  export class Model {
    /**
     * Utilize the `renderable.required` sentinel
     * to indicate this renderable should be provided to the constructor.
     * */
    items = renderable("multi", renderable.required);

    constructor(initial: InitialRenderables<Model>) {
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
