<script lang="ts">
  import { Sweater } from "./sweater-vest-suede";
  import SingleCustom, { Model } from "./SingleCustom.svelte";
</script>

<Sweater
  body={async ({ set }) => {
    set({
      model: new Model({
        renderables: (render) => ({
          item: {
            title: "Initial title",
            renderable: render("<strong>Initial content</strong>"),
          },
        }),
      }),
    });
  }}
>
  {#snippet vest({ model }: { model: Model })}
    {@const { item } = model}

    {#snippet withProps(name: string)}
      Hello, {name}!
    {/snippet}

    {#snippet noProps()}
      {console.log("Rendering noProps snippet")}
      {@render withProps("World")}
    {/snippet}

    <button
      onclick={() =>
        item.set((render) => ({
          title: "Raw html",
          renderable: render("<em>Hello!</em>"),
        }))}
    >
      Raw html
    </button>

    <button
      onclick={() =>
        item.set((render) => ({
          title: "No props",
          renderable: render(noProps),
        }))}
    >
      No props
    </button>

    <button
      onclick={() =>
        item.set((render) => ({
          title: "With props",
          renderable: render(withProps, "buddy"),
        }))}
    >
      With props
    </button>

    <SingleCustom {model} />

    <button
      onclick={() => {
        const { current } = model.item;
        current.title = current.title.split("").reverse().join("");
      }}
    >
      Reverse title
    </button>
  {/snippet}
</Sweater>
