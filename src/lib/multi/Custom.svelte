<script lang="ts" module>
  import { renderable, renderer } from "../../../release";

  export type Custom = {
    title: string;
    renderable: renderable.Snippet;
  };

  export class Model {
    readonly items = renderable<Custom>("multi", renderable.required);

    constructor(initial: renderable.Initial<Model>) {
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
