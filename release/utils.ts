import type { Snippet } from "svelte";

export type ExtractSnippetArgs<T extends Snippet<any>> = T extends Snippet<
  infer A
>
  ? A
  : never;

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type IsNullable<T> = null extends T
  ? true
  : undefined extends T
  ? true
  : false;

export type MakeOptionalIfNullable<T> = {
  [K in keyof T as IsNullable<T[K]> extends true ? K : never]?: NonNullable<
    T[K]
  >;
} & {
  [K in keyof T as IsNullable<T[K]> extends false ? K : never]: T[K];
};

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type Maybe<T> = T | undefined;

export type WithValue<T> = { value: T };

export type SingleOrArray<T> = T | T[];

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
