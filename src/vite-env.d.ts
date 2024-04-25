/// <reference types="vite/client" />

declare module "sinks" {
  /**
   * Represents the options for the getChanges function.
   */
  interface GetChangesOptions {
    /**
     * Specifies whether deletions should be included in the changes object.
     */
    includeDeletions?: boolean;

    /**
     * Specifies an array of keys to be ignored during comparison.
     */
    ignoredKeys?: string[];
  }

  /**
   * Calculates the changes between two objects.
   * @param original The original object.
   * @param modified The modified object.
   * @param options Additional options for customizing the comparison.
   * @returns The changes object or null.
   */
  declare function getChanges<T>(
    original: T,
    modified: T,
    options?: GetChangesOptions
  ): unknown | null;

  /**
   * This returns an updated object with changes applied.
   * These changes need to be structured as an object of paths to update.
   */
  declare function updateObject<T>(obj: T, changes: unknown): T;

  /**
   * This will get additive changes (not deletions) from each object
   * compared to the other, and try to build a shared object of merged changes.
   */
  declare function mergeObject<T extends object>(
    obj: T,
    changes: unknown
  ): { updated: T; conflicts?: { [key: keyof T]: unknown } };

  export { getChanges, updateObject };
}
