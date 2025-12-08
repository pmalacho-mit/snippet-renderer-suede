<script lang="ts" module>
  import { renderable, renderer } from "../../../release";

  export class Model {
    item = renderable("single");

    constructor(initial?: renderable.Initial<Model>) {
      renderable.init(this, initial);
    }
  }
</script>

<script lang="ts">
  let { model }: { model: Model } = $props();

  const text = $derived(model.item.current !== undefined ? "Yes" : "No");
</script>

<div>
  <em>Have you provided a renderable?</em> <strong>{text}</strong>
  <div>
    {@render renderer(model.item)}
  </div>
</div>
