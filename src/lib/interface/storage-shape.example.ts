// ---- Simple in-memory implementation (R=false) ----

import { StorageListener, StorageMethodName } from "../type";
import { StorageShape } from "./storage-shape.interface";


export class MemoryStorage<O extends Record<string, any>>
  implements StorageShape<false, O, keyof O, O[keyof O]>
{
  value = {} as O;

  #map = new Map<keyof O, O[keyof O]>();
  #listeners = new Map<string, Set<StorageListener<keyof O, O[keyof O]>>>();

  get size(): number {
    return this.#map.size;
  }

  
  /**
   * @description Clears the map.
   * @returns {this} 
   */
  clear(): this {
    this.#map.clear();
    this.value = {} as O;
    this.#emit('clear', undefined as any);
    return this;
  }

  destroy(): this {
    this.clear();
    this.#listeners.clear();
    return this;
  }

  lock(): this {
    return this;
  }

  set(value: O): this {
    // DataShape.set(value): replace full dataset
    this.value = value;
    this.#map = new Map(Object.entries(value) as any);
    this.#emit('set', undefined as any);
    return this;
  }

  add(key: keyof O, value: O[keyof O]): boolean {
    if (this.#map.has(key)) return false;
    this.#map.set(key, value);
    (this.value as any)[key] = value;
    this.#emit('add', {key, value});
    return true;
  }

  put(key: keyof O, value: O[keyof O]): boolean {
    const existed = this.#map.has(key);
    this.#map.set(key, value);
    (this.value as any)[key] = value;
    this.#emit(existed ? 'put' : 'add', {key, value});
    return true;
  }

  update(key: keyof O, value: O[keyof O]): boolean {
    if (!this.#map.has(key)) return false;
    this.#map.set(key, value);
    (this.value as any)[key] = value;
    this.#emit('update', {key, value});
    return true;
  }

  delete(key: keyof O): boolean {
    const ok = this.#map.delete(key);
    if (ok) {
      delete (this.value as any)[key];
      this.#emit('delete', {key, value: undefined});
    }
    return ok;
  }

  get(key: keyof O): O[keyof O] | undefined {
    return this.#map.get(key);
  }

  has(key: keyof O): boolean {
    return this.#map.has(key);
  }

  keys(): (keyof O)[] {
    return Array.from(this.#map.keys());
  }

  values(): O[keyof O][] {
    return Array.from(this.#map.values());
  }

  entries(): [keyof O, O[keyof O]][] {
    return Array.from(this.#map.entries());
  }

  forEach(callback: (value: O[keyof O], key: keyof O) => void): this {
    this.#map.forEach((v, k) => callback(v, k));
    return this;
  }

  // For simplicity, we key listeners by event.type (string)
  on(event: StorageMethodName, listener: (payload: {key: keyof O, value?: O[keyof O]}) => void): this {
    if (!this.#listeners.has(event)) this.#listeners.set(event, new Set());
    this.#listeners.get(event)!.add(listener);
    return this;
  }

  off(event: StorageMethodName): this {
    this.#listeners.delete(event);
    return this;
  }

  save(): this {
    // no-op for memory storage
    return this;
  }

  load(): this {
    // no-op for memory storage
    return this;
  }

  #emit(type: string, payload: {key: keyof O, value?: O[keyof O]}) {
    const listeners = this.#listeners.get(type);
    if (!listeners) return;
    listeners.forEach(fn => fn(payload));
  }
}

// ---- Usage example ----

type LayoutState = {
  'pinned.left': boolean;
  'collapsed.left': boolean;
};

const store = new MemoryStorage<LayoutState>();

// Subscribe (simple: event.type decides which listeners fire)
store.on('put', (payload) => {
  console.log('[put]', payload.key, payload.value);
});

store.add('pinned.left', false);          // true
store.put('pinned.left', true);          // true (upsert)
store.update('pinned.left', false);      // true (exists)
store.update('collapsed.left', true);    // false (missing)
store.delete('pinned.left');             // true

console.log(store.size);                 // 0
console.log(store.keys());               // []

