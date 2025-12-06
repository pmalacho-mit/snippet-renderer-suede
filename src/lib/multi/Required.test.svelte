<script lang="ts">
  import { Sweater } from "../sweater-vest-suede";
  import MultiRequired, { Model } from "./Required.svelte";
  import { untrack } from "svelte";
</script>

<Sweater
  body={async ({ set }) => {
    set({
      model: new Model({
        renderables: (render) => ({
          items: [],
        }),
      }),
    });
  }}
>
  {#snippet vest(pocket: { model: Model })}
    {@const { model } = pocket}
    {@const { items } = model}

    <!-- BEGIN: Buttons to manipulate items -->
    <button
      onclick={() =>
        items.append((render) => render(` ${items.current.length + 1}`))}
    >
      Add raw number
    </button>
    <button onclick={() => items.append((render) => render(noProps))}>
      Add no props (squared)
    </button>
    <button onclick={() => items.append((render) => render(withProps, 3))}>
      Add with props (cubed)
    </button>
    <button onclick={() => items.unset()}> Reset </button>
    <!-- END: Buttons to manipulate items -->

    <MultiRequired {model} />

    <!-- BEGIN: Snippets render via the component -->
    {#snippet withProps(exponent: number)}
      {@const current = untrack(() => items.current.length)}
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
    <!-- END: Snippets render via the component -->
  {/snippet}
</Sweater>
