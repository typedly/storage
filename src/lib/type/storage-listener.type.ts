/**
 * @description The type definition for storage listener function.
 * @export
 * @template [K=string] 
 * @template [V=any] 
 * @template {{key: K, value?: V}} [Payload={key: K, value?: V}] 
 * @template [Return=void] 
 */
export type StorageListener<
  K = string,
  V = any,
  Payload extends {key: K, value?: V} = {key: K, value?: V},
  Return = void
> = (payload: Payload) => Return | Promise<Return>;

// const listener: StorageListener<string, number, {key: string, value?: number, check: boolean}> = ({key, value, check}) => {};