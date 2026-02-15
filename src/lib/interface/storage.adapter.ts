// Interface.
import { StorageShape } from "./storage.shape";
/**
 * @description The storage adapter shape.
 * @export
 * @interface StorageAdapter
 * @template [O=Record<string, any>] 
 * @template {keyof O} [K=keyof O] 
 * @template [V=O[K]] The type of the values in the storage.
 * @template {boolean} [R=false] 
 * @template {{key: K, value?: V}} [P={key: K, value?: V}] 
 * @extends {StorageShape<R, O, K, V, P>}
 */
export interface StorageAdapter<
  O = Record<string, any>,
  K extends keyof O = keyof O,
  V = O[K],
  R extends boolean = false,
  P extends {key: K, value?: V} = {key: K, value?: V}
> extends StorageShape<R, O, K, V, P> {
  version: string;
}