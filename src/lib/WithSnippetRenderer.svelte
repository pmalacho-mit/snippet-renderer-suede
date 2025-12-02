<script lang="ts" module>
  import {
    renderable,
    renderer,
    type InitialRenderables,
    type Example,
  } from "../../release";

  export class Model {
    items = renderable("multi", renderable.required);

    constructor(initial?: InitialRenderables<Model>) {
      renderable.init(this, initial);
    }
  }
</script>

<script lang="ts">
  let { model }: { model: Model } = $props();

  model.items.append((render) => render(hi, "world"));
</script>

{#snippet hi(x: string)}
  <div>hello {x}</div>
{/snippet}

{@render hi("there")}
{@render renderer(model.items.current)}
{@render hi("where")}

<button
  onclick={() =>
    model.items.append((render) => render(hi, `${model.items.current.length}`))}
>
  Add Item
</button>
