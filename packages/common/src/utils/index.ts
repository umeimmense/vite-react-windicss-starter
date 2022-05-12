import { isBoolean, isEmpty, isNumber } from 'lodash';

/**
 * to return Promise<[T, Error]>
 * @param {Promise<T>} promise
 */
export async function to<T, E = Error>(promise: Promise<T>): Promise<[T, E]> {
  try {
    const ret = await promise;
    return [ret, null as unknown as E];
  } catch (e: any) {
    return [null as unknown as T, e];
  }
}

/**
 * toSync return [T, Error]
 * @param {() => T} fn
 */
export function toSync<T, E = Error>(fn: () => T): [T, E] {
  try {
    return [fn(), null as unknown as E];
  } catch (e: any) {
    return [null as unknown as T, e];
  }
}

/**
 * isZeroValue return boolean
 * @param value: unknown
 * @description filter false | '' | undefined | 0 | []
 */
export function isZeroValue(value: unknown): boolean {
  return isEmpty(value) && !((isNumber(value) && value !== 0) || (isBoolean(value) && value));
}
