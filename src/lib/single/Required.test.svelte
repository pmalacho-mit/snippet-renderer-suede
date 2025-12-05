<script lang="ts">
  import { Sweater } from "../sweater-vest-suede";
  import SingleRequired, { Model } from "./Required.svelte";
</script>

{#snippet withProps(name: string)}
  Hello, {name}!
{/snippet}

<Sweater
  body={async ({ set, delay }) => {
    let index = 0;
    const names = ["World", "Friend", "Buddy", "Pal", "Mate"];
    const next = () => names[index++ % names.length];

    const { model } = set({
      model: new Model({
        renderables: (render) => ({
          item: render(withProps, next()),
        }),
      }),
    });

    while (true) {
      await delay({ seconds: 1 });
      model.item.set((render) => render(withProps, next()));
    }
  }}
>
  {#snippet vest({ model }: { model: Model })}
    <SingleRequired {model} />
  {/snippet}
</Sweater>
