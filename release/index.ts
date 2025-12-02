export {
  default as SnippetRenderer,
  renderable,
  renderer,
  type InitialRenderables,
} from "./SnippetRenderer.svelte";

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
