<script lang="ts">
  import { Sweater } from "../sweater-vest-suede";
  import SingleOptional, { Model } from "./Optional.svelte";
</script>

<Sweater
  body={async ({ set }) => {
    set({ model: new Model() });
  }}
>
  {#snippet vest({ model }: { model: Model })}
    {@const { item } = model}

    {#snippet withProps(name: string)}
      Hello, {name}!
    {/snippet}

    {#snippet noProps()}
      {@render withProps("World")}
    {/snippet}

    <button onclick={() => item.set((render) => render("<em>Hello!</em>"))}>
      Raw html
    </button>

    <button onclick={() => item.set((render) => render(noProps))}>
      No props
    </button>

    <button onclick={() => item.set((render) => render(withProps, "buddy"))}>
      With props
    </button>

    <button onclick={() => item.unset()}> Unset </button>

    <SingleOptional {model} />
  {/snippet}
</Sweater>
