/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseRepository } from "../base";

/**
 * Type definition for repository class decorators.
 *
 * This type represents the function signature for decorators that can be applied to
 * repository classes extending BaseRepository. It enables creating custom decorators
 * that modify, enhance, or add functionality to repository classes at design time.
 *
 * @template T The constructor type for classes extending BaseRepository
 * @param target The repository class constructor being decorated
 * @returns Either the modified class constructor or void if modifications are made in-place
 *
 * @remarks
 * Repository decorators can be used to:
 * - Add new methods or properties to repository classes
 * - Override existing repository methods with enhanced implementations
 * - Register metadata for repositories (e.g., for validation, serialization)
 * - Configure entity-specific behaviors without modifying the base repository logic
 * - Apply cross-cutting concerns like logging, caching, or authorization checks
 *
 * The decorator may either return a new class (typically a class that extends the target)
 * or void if it makes modifications directly to the provided target class.
 *
 * @example
 * ```typescript
 * // Define a custom repository decorator that adds logging
 * const WithLogging: RepositoryDecorator = <T extends { new (...args: any[]): BaseRepository<any> }>(target: T) => {
 *   return class extends target {
 *     async findOne(...args: any[]): Promise<any> {
 *       console.log(`Repository ${this.constructor.name}: Finding one entity with args:`, args);
 *       const result = await super.findOne(...args);
 *       console.log(`Repository ${this.constructor.name}: Found entity:`, result);
 *       return result;
 *     }
 *   };
 * };
 *
 * // Apply the decorator to a repository class
 * @WithLogging
 * class UserRepository extends BaseRepository<User> {
 *   // Repository-specific methods...
 * }
 * ```
 */
export type RepositoryDecorator = <T extends { new (...args: any[]): BaseRepository<any> }>(target: T) => T | void;
