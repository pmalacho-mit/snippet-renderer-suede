<script lang="ts">
  import { Sweater } from "./sweater-vest-suede";
  import MultiOptional, { Model } from "./MultiOptional.svelte";
  import { untrack } from "svelte";
</script>

<Sweater
  body={async ({ set }) => {
    set({ model: new Model() });
  }}
>
  {#snippet vest(pocket: { model: Model })}
    {@const { model } = pocket}
    {@const { items } = model}

    {#snippet withProps(exponent: number)}
      {@const current = untrack(() => items.current?.length ?? 0)}
      {@const result = Math.pow(current, exponent)}
      <div
        style:display="inline"
        style:border="1px solid black"
        style:padding="0 2px"
        style:margin="0 2px"
      >
        {current} <sup>{exponent}</sup> = {result}
      </div>
    {/snippet}

    {#snippet noProps()}
      {@render withProps(2)}
    {/snippet}

    <div>
      <button
        onclick={() =>
          items.append((render) =>
            render(` ${(items.current?.length ?? 0) + 1}`)
          )}
      >
        Add raw number
      </button>
      <button onclick={() => items.append((render) => render(noProps))}>
        Add no props (squared)
      </button>
      <button onclick={() => items.append((render) => render(withProps, 3))}>
        Add with props (cubed)
      </button>
      <!-- 
      <button onclick={() => items.unset()}> Reset </button>
      -->
    </div>
    <MultiOptional {model} />
  {/snippet}
</Sweater>
