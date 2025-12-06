<script lang="ts" module>
  import { renderable, renderer } from "../../../release";

  export type Custom = {
    title: string;
    renderable: renderable.Snippet;
  };

  export class Model {
    readonly item = renderable<Custom>("single", renderable.required);

    constructor(initial: renderable.Initial<Model>) {
      renderable.init(this, initial);
    }
  }
</script>

<script lang="ts">
  let { model }: { model: Model } = $props();
</script>

<div>
  <h1>{model.item.current.title}</h1>
  {@render renderer(model.item.current.renderable)}
</div>
