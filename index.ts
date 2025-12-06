export {
  default as SnippetRenderer,
  renderable,
  renderer,
  type Renderable,
} from "./SnippetRenderer.svelte";

import type {
  InitialRenderables,
  RenderableContent,
  RenderableSnippet,
} from "./SnippetRenderer.svelte";

/** A snippet that can render:
 * - raw HTML content
 * - a renderable snippet with or without a prop (see `renderable.Snippet`)
 * - an array of the above renderable contents
 */
export namespace renderer {
  export type Content = RenderableContent;
}

/**
 * `renderable` can be:
 * - invoked as a function (to create a `Renderable`, a reactive container for things that can be dynamically rendered by the `renderer` snippet or `SnippetRenderer` component)
 * - used as an object with utility methods (`init` and `required`)
 * - used as a namespace for types (`Initial`, `Snippet`, and `Example`)
 */
export namespace renderable {
  export type Initial<T> = InitialRenderables<T>;
  export type Snippet<Prop extends unknown | undefined = any> =
    RenderableSnippet<Prop>;

  /**
   * @example
   * ```svelte
   * <script lang="ts" module>
   *   import { renderer, renderable, type InitialRenderables } from "snippet-renderer-suede";
   *
   *   export class Model {
   *     requiredItem = renderable("single", renderable.required);
   *     optionalItem = renderable("single");
   *
   *     requiredItems = renderable("multi", renderable.required);
   *     optionalItems = renderable("multi");
   *
   *     constructor(initial?: InitialRenderables<Model>) {
   *       renderable.init(this, initial);
   *     }
   *   }
   * </script>
   *
   * <script lang="ts">
   *   let { model }: { model: Model } = $props();
   * </script>
   *
   * {@render renderer(model.requiredItem.current)}
   *
   * {#if model.optionalItem.current}
   *   {@render renderer(model.optionalItem.current)}
   * {/if}
   *
   * {@render renderer(model.requiredItems.current)}
   *
   * {#each model.requiredItems.current as item}
   *   <!-- with custom markup -->
   *   <div>
   *     {@render renderer(item) }
   *   </div>
   * {/each}
   *
   * {#if model.optionalItems.current}
   *   {@render renderer(model.optionalItems.current)}
   *   <!-- or with custom markup, see above -->
   * {/if}
   *
   * ```
   */
  export type Example = "for documentation purposes only";
}
