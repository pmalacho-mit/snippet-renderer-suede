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
    item = renderable("single", renderable.required);

    constructor(initial: InitialRenderables<Model>) {
      renderable.init(this, initial);
    }
  }
</script>

<script lang="ts">
  let { model }: { model: Model } = $props();
</script>

<div>
  {@render renderer(model.item.current)}
</div>
