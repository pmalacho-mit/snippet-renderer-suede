<script lang="ts" module>
  import {
    renderable,
    renderer,
    type RenderableSnippet,
    type InitialRenderables,
  } from "../../release";

  export class Model {
    item = renderable<{ title: string; renderable: RenderableSnippet }>(
      "single",
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
  <h1>{model.item.current.title}</h1>
  {@render renderer(model.item.current.renderable)}
</div>
