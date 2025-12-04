<script lang="ts" module>
  import type { Snippet } from "svelte";
  import type {
    ExtractSnippetArgs,
    ArrayElement,
    Expand,
    MakeOptionalIfNullable,
    Maybe,
    RequiredKeys,
    SingleOrArray,
  } from "./utils";

  export type RenderableSnippet<
    TSnippetProp extends unknown | undefined = unknown,
  > = TSnippetProp extends undefined
    ? { snippet: Snippet<[]>; prop?: never }
    : { snippet: Snippet<[TSnippetProp]>; prop: TSnippetProp };

  export type SnippetProp<T extends Snippet<any>> =
    T extends Snippet<infer U>
      ? U extends [infer first, ...any]
        ? first
        : never
      : never;

  const noProp = <TProp extends unknown | undefined>(
    snippet: Snippet<[TProp]> | Snippet<[]>,
    prop: TProp
  ): snippet is Snippet<[]> => prop === undefined;

  /**
   *
   * @overload
   * @param snippet
   */
  export function renderableSnippet<TSnippet extends Snippet<[]>>(
    snippet: TSnippet
  ): RenderableSnippet<undefined>;
  /**
   *
   * @overload
   * @param snippet
   * @param prop
   */
  export function renderableSnippet<TSnippet extends Snippet<[any]>>(
    snippet: TSnippet,
    prop: ExtractSnippetArgs<TSnippet>[0]
  ): RenderableSnippet<ExtractSnippetArgs<TSnippet>[0]>;
  /**
   * Convenience overload to create a renderable snippet from raw HTML content.
   * @overload
   * @param snippet
   * @param prop
   */
  export function renderableSnippet(html: string): RenderableSnippet<any>;
  /** Implementation */
  export function renderableSnippet<TSnippet extends Snippet<any>>(
    snippet: TSnippet | string,
    prop?: ExtractSnippetArgs<TSnippet> extends []
      ? undefined
      : ExtractSnippetArgs<TSnippet>[0]
  ): RenderableSnippet<any> {
    return typeof snippet === "string"
      ? { snippet: html, prop: snippet }
      : prop === undefined
        ? { snippet }
        : { snippet, prop };
  }

  export type RenderSnippet<T = ReturnType<typeof renderableSnippet>> = (
    render: typeof renderableSnippet
  ) => T;

  type Kind = "single" | "multi";
  type UndefinedIfMaybe<T> = T extends Maybe<any> ? undefined : never;

  export type Renderable<
    K extends Kind,
    T extends K extends "multi"
      ? Maybe<Record<string, any>[]>
      : Maybe<Record<string, any>>,
  > = {
    readonly kind: K;
    get current(): T;
  } & (K extends "multi"
    ? {
        /**
         * Set the current value of the renderable. This will replace the current value with the new value.
         *
         *
         * @param get A callback that accepts a `render` function as an argument, which can then be used to render a snippet in a type-safe manner.
         * For convenience, when setting a multi renderable, you can return either an array of values or a single value (which will then be automatically wrapped into an array).
         *
         * @example
         * ```ts
         * // Setting a single value
         * renderable.set((render) => render(text, "Hello, world!"));
         * ```
         *
         * @example
         * ```ts
         * // Setting an array of values
         * renderable.set((render) => [render(text, "Hello, world!"), render(text, "Hello, world!")]);
         * ```
         */
        set: (
          get: (
            render: typeof renderableSnippet
          ) =>
            | SingleOrArray<
                Exclude<T, undefined> extends readonly unknown[]
                  ? ArrayElement<Exclude<T, undefined>>
                  : any
              >
            | UndefinedIfMaybe<T>
        ) => void;
        append: (
          get: (
            render: typeof renderableSnippet
          ) => SingleOrArray<
            Exclude<T, undefined> extends readonly unknown[]
              ? ArrayElement<Exclude<T, undefined>>
              : any
          >
        ) => void;
      }
    : {
        set: (
          get: (render: typeof renderableSnippet) => T | UndefinedIfMaybe<T>
        ) => void;
      } & (undefined extends T ? { unset: () => void } : {}));

  export type OptionalRenderable = Renderable<
    "single",
    Maybe<RenderableSnippet<any>>
  >;

  type Constraint = Record<string, any>;
  type Default = RenderableSnippet<any>;

  const valueFromMulti = <T extends Maybe<SingleOrArray<any>>>(value: T) =>
    Array.isArray(value) ? value : value !== undefined ? [value] : undefined;

  /**
   * Create a `"single"` renderable that is optional (meaning the underlying`current` property can be `undefined`)
   * @overload
   * @param kind specify that this is a `"single"` renderable
   */
  function _renderable<T extends Constraint = Default>(
    kind: "single"
  ): Expand<Renderable<"single", Maybe<T>>>;
  /**
   * Create a `"single"` renderable that cis required (meaning the underlying`current` property will always have a value)
   * @overload
   * @param kind specify that this is a `"single"` renderable
   * @param initial A callback that returns the initial value of the renderable
   */
  function _renderable<T extends Constraint = Default>(
    kind: "single",
    initial: (render: typeof renderableSnippet) => T
  ): Expand<Renderable<"single", T>>;
  /**
   * Create a `"multi"` renderable that is optional (meaning the underlying`current` property can be `undefined`)
   * @overload
   * @param kind specify that this is a `"multi"` renderable
   */
  function _renderable<T extends Constraint = Default>(
    kind: "multi"
  ): Expand<Renderable<"multi", Maybe<T[]>>>;
  /**
   * Create a `"multi"` renderable that is required
   * (meaning the underlying`current` property will always have a value, and is initialized to an empty array)
   * @overload
   * @param kind specify that this is a `"multi"` renderable
   * @param initial A callback that returns the initial value of the renderable
   */
  function _renderable<T extends Constraint = Default>(
    kind: "multi",
    initial: (render: typeof renderableSnippet) => SingleOrArray<T>
  ): Expand<Renderable<"multi", T[]>>;
  /** Implementation */
  function _renderable<
    K extends Kind,
    Initial extends
      | ((
          render: typeof renderableSnippet
        ) => SingleOrArray<ReturnType<typeof renderableSnippet>>)
      | undefined,
  >(kind: K, initial?: Initial) {
    type Single = Maybe<RenderableSnippet<any>>;
    type Multi = Maybe<RenderableSnippet<any>[]>;
    type Return = Renderable<
      K,
      K extends "multi"
        ? Initial extends undefined
          ? RenderableSnippet<any>[]
          : Multi
        : Single
    >;

    const value =
      kind === "multi" && initial === renderable.required
        ? []
        : initial?.(renderableSnippet);
    let state = $state(kind === "multi" ? valueFromMulti(value) : value);
    switch (kind) {
      case "single":
        const single: Renderable<"single", Single> = {
          kind,
          get current() {
            return state as Single;
          },
          set: (get) => {
            state = get(renderableSnippet);
          },
          unset: () => {
            state = undefined;
          },
        };
        return single as unknown as Return;
      case "multi":
        const multi: Renderable<"multi", Multi> = {
          kind,
          get current() {
            return state as Multi;
          },
          set(get) {
            const value = get(renderableSnippet);
            state = valueFromMulti(value) as Multi;
          },
          append(get) {
            state ??= [];
            const value = get(renderableSnippet);
            if (value === undefined) throw new Error("Cannot append undefined");
            Array.isArray(value)
              ? (state as Exclude<Multi, undefined>).push(...value)
              : (state as Exclude<Multi, undefined>).push(
                  value as RenderableSnippet<any>
                );
          },
        };
        return multi as unknown as Return;
    }
  }

  export type ExtractRenderableSnippets<T> = MakeOptionalIfNullable<{
    [k in keyof T as T[k] extends Renderable<any, any>
      ? k
      : never]: T[k] extends Renderable<infer K, infer T>
      ? K extends "single"
        ? T
        : T extends (infer Item)[]
          ? SingleOrArray<Item> | UndefinedIfMaybe<T>
          : never
      : never;
  }>;

  export type Renderables<
    T,
    Picked extends
      keyof ExtractRenderableSnippets<T> = keyof ExtractRenderableSnippets<T>,
  > = (
    render: typeof renderableSnippet
  ) => Expand<Pick<ExtractRenderableSnippets<T>, Picked>>;

  export type WithRenderables<T> = Expand<{
    renderables: Renderables<T>;
  }>;

  export type NoRequiredRenderables<T> =
    RequiredKeys<ExtractRenderableSnippets<T>> extends never ? true : false;

  export type InitialRenderables<T> =
    NoRequiredRenderables<T> extends true
      ? Maybe<Partial<WithRenderables<T>>>
      : WithRenderables<T>;

  function init<T>(target: T, source: InitialRenderables<T>): void {
    const values = source?.renderables?.(renderableSnippet);
    if (!values) return;
    for (const key in values) {
      const entry = target[key as keyof T] as Renderable<any, any>;
      const value = values[
        key as keyof typeof values
      ] as RenderableSnippet<any>;
      entry.set(() => value);
    }
  }

  const required = (render: typeof renderableSnippet<any>) =>
    render({
      snippet: requiredPlaceholder,
    }) as RenderableSnippet<any>;

  const staticMethods = {
    init,
    required,
  } as const;

  export const renderable = Object.assign(
    _renderable,
    staticMethods as typeof staticMethods & {
      Types: {
        Init: typeof init;
      };
    }
  );

  export type RenderableContent =
    | RenderableSnippet<any>
    | Snippet<[]>
    | string
    | RenderableContent[];

  export { renderer };

  export type RenderSnippetWithProp<T> = (
    prop: T
  ) => RenderSnippet<RenderableSnippet<T>>;
</script>

<script lang="ts" generics="TSnippetProp extends unknown | undefined">
  import Self from "./SnippetRenderer.svelte";
  let { snippet, prop }: RenderableSnippet<TSnippetProp> = $props();
</script>

{#snippet html(content: string)}
  {@html content}
{/snippet}

{#if noProp(snippet, prop)}
  {@render snippet()}
{:else}
  {@render snippet(prop)}
{/if}

{#snippet requiredPlaceholder()}
  {@const _ = console.error(
    "A required snippet was rendered without providing the necessary snippet."
  )}
  Error: Required snippet not provided
{/snippet}

{#snippet renderer(content: RenderableContent)}
  {#if typeof content === "string"}
    {content}
  {:else if typeof content === "function"}
    {@render content()}
  {:else if Array.isArray(content)}
    {#each content as item}
      {@render renderer(item)}
    {/each}
  {:else}
    <Self {...content} />
  {/if}
{/snippet}
