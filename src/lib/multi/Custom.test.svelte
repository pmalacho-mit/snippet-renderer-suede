<script lang="ts">
  import { Sweater } from "../sweater-vest-suede";
  import MultiCustom, { Model } from "./Custom.svelte";
</script>

<Sweater
  body={async ({ set }) => {
    const model = new Model({
      renderables: (render) => ({
        items: {
          title: "Initial title",
          renderable: render("<strong>Initial content</strong>"),
        },
      }),
    });
    set({ model });
  }}
>
  {#snippet vest({ model }: { model: Model })}
    <MultiCustom {model} />
    <button
      onclick={() =>
        model.items.append((render) => ({
          title: "Added item " + (model.items.current.length + 1),
          renderable: render(
            "<em>Content for item " + (model.items.current.length + 1) + "</em>"
          ),
        }))}
    >
      Add item
    </button>
  {/snippet}
</Sweater>
