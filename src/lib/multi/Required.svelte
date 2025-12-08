<script lang="ts" module>
  import { renderable, renderer } from "../../../release";

  export class Model {
    /**
     * Utilize the `renderable.required` sentinel
     * to indicate this renderable should be `set` via the constructor
     * (using `renderable.init`).
     * */
    readonly items = renderable("multi", renderable.required);

    constructor(initial: renderable.Initial<Model>) {
      renderable.init(this, initial);
    }
  }
</script>

<script lang="ts">
  let { model }: { model: Model } = $props();
</script>

(length: {model.items.current.length})

<div>
  {@render renderer(model.items)}
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
