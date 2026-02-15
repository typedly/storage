// @typedly.
import { AsyncReturn, DataShape } from '@typedly/data';
// Type.
import { StorageListener, StorageMethodName } from '../type';
/**
 * @description Defines the shape of a storage object, with replaceable data shape and async return types.
 * @export
 * @interface StorageShape
 * @template {boolean} [R=false] The async return type flag, where `true` means all methods return Promises and `false` means they return values directly.
 * @template [O=Record<string, any>] The shape of the storage object.
 * @template {keyof O} [K=keyof O] The keys of the storage object.
 * @template [V=O[K]] The values of the storage object.
 * @extends {DataShape<O, R>}
 */
export interface StorageShape<
  R extends boolean = false,
  O = Record<string, any>,
  K extends keyof O = keyof O,
  V = O[K],
  P extends {key: K, value?: V} = {key: K, value?: V}
> extends DataShape<O, R> {
  /**
   * @description The number of key-value pairs in the storage.
   * @readonly
   * @type {number}
   */
  get size(): number;
  
  /**
   * @description Adds the value of `V` under the `key` of `K`.
   * @param {K} key The key under which the value is added.
   * @param {V} value The value to be added.
   * @returns {AsyncReturn<R, boolean>} 
   */
  add(key: K, value: V): AsyncReturn<R, boolean>;

  /**
   * @description Deletes the value under the `key` of `K`.
   * @param {K} key The key whose value is to be deleted.
   * @returns {AsyncReturn<R, boolean>} 
   */
  delete(key: K): AsyncReturn<R, boolean>;

  /**
   * @description Retrieves all key-value pairs in the storage.
   * @returns {AsyncReturn<R, [K, V][]>} 
   */
  entries(): AsyncReturn<R, [K, V][]>;

  /**
   * @description Executes a provided function once for each key-value pair in the storage.
   * @param {(value: V, key: K) => void} callback The function to execute for each element.
   * @returns {AsyncReturn<R, this>} 
   */
  forEach(callback: (value: V, key: K) => void): AsyncReturn<R, this>;

  /**
   * @description Retrieves the value under the `key` of `K`.
   * @param {K} key The key whose value is to be retrieved.
   * @returns {AsyncReturn<R, V | undefined>} 
   */
  get(key: K): AsyncReturn<R, V | undefined>;

  /** 
   * @description Checks if the storage has a value under the `key` of `K`.
   * @param {K} key The key to check for existence.
   * @returns {AsyncReturn<R, boolean>} 
   */
  has(key: K): AsyncReturn<R, boolean>;

  /**
   * @description Retrieves all the keys in the storage.
   * @returns {AsyncReturn<R, K[]>} 
   */
  keys(): AsyncReturn<R, K[]>;

  /**
   * @description Removes a listener for the specified storage method.
   * @param {StorageMethodName} method The storage method for which to remove the listener.
   * @param {StorageListener<K, V, P>} listener The listener function to be removed.
   * @returns {AsyncReturn<R, this>} 
   */
  off?(method: StorageMethodName, listener: StorageListener<K, V, P>): AsyncReturn<R, this>;

  /**
   * @description Removes all listeners for the specified storage method.
   * @param {StorageMethodName} method The storage method for which to remove the listeners.
   * @returns {AsyncReturn<R, this>} 
   */
  off?(method: StorageMethodName): AsyncReturn<R, this>;

  /**
   * @description Adds a listener for the specified storage method.
   * @param {StorageMethodName} method The storage method for which to add the listener.
   * @param {StorageListener<K, V, P>} listener The listener function to be called when the storage method is invoked.
   * @returns {AsyncReturn<R, this>} 
   */
  on?(method: StorageMethodName, listener: StorageListener<K, V, P>): AsyncReturn<R, this>;

  /**
   * @description Saves the current state of the storage under the data.
   * @returns {AsyncReturn<R, this>} 
   */
  save(): AsyncReturn<R, this>;

  /**
   * @description Loads the state of the storage from the data.
   * @returns {AsyncReturn<R, this>} 
   */
  load(): AsyncReturn<R, this>;

  /**
   * @description Sets the value of `V` under the `key` of `K`, replacing any existing value.
   * @param {K} key The key under which the value is set.
   * @param {V} value The value to be set.
   * @returns {AsyncReturn<R, boolean>} 
   */
  put(key: K, value: V): AsyncReturn<R, boolean>;

  /**
   * @description Updates the value of `V` under the `key` of `K`, only if it already exists.
   * @param {K} key The key under which the value is updated.
   * @param {V} value  The value to be updated.
   * @returns {AsyncReturn<R, boolean>} 
   */
  update(key: K, value: V): AsyncReturn<R, boolean>;

  /**
   * @description The collection of all values in the storage.
   * @returns {AsyncReturn<R, V[]>} 
   */
  values(): AsyncReturn<R, V[]>;
}
