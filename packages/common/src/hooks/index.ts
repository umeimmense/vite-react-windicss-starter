import type { Draft } from 'immer';
import produce from 'immer';
import { cloneDeep, isBoolean, isNumber } from 'lodash';
import 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeepCompareEffect, useLatest } from 'react-use';
import { useImmer } from 'use-immer';

import { isZeroValue } from '../utils';

function useObject<T extends Record<string, any>>(initialValue: T) {
  const [copy, rawSet] = useImmer(initialValue);
  const set = useMemo(() => {
    function set(data: Partial<T>): void;
    function set(f: (draft: T | Draft<T>) => void): void;
    function set<K extends keyof T>(key: K, value: T[K]): void;
    function set<K extends keyof T>(data: any, value?: T[K]): void {
      if (typeof data === 'string') {
        rawSet((draft) => {
          const key = data as K;
          const v = value as T[K];
          const d = draft as T;
          d[key] = v;
        });
      } else if (typeof data === 'function') {
        rawSet(data);
      } else if (typeof data === 'object') {
        rawSet((draft) => {
          const obj = data as T;
          for (const key of Object.keys(obj)) {
            const k = key as keyof T;
            const d = draft as T;
            d[k] = obj[k];
          }
        });
      }
    }
    return set;
  }, [rawSet]);

  return [copy, set] as [T, typeof set];
}

function useJsonQuery<T extends Record<string, any>>(
  parser: (params: URLSearchParams) => T,
  serializer: (data: T) => URLSearchParams,
  initial: T
) {
  const parserRef = useLatest(parser);
  const serializerRef = useLatest(serializer);
  const initialRef = useLatest(initial);

  const localtion = useLocation();
  const navigate = useNavigate();
  const [copy, setCopy] = useObject(initial);
  const parsedParams = useMemo(() => {
    const query = new URLSearchParams(localtion.search);
    return parserRef.current(query);
  }, [localtion.search, parserRef]);

  const targetValue = useMemo(() => ({ ...initialRef.current, ...parsedParams }), [initialRef, parsedParams]);

  useEffect(() => setCopy(targetValue), [targetValue, setCopy]);

  const setValue = useCallback(
    (fn: (draft: Draft<T>) => void) => {
      const obj = { ...parsedParams, ...produce(targetValue, fn) };
      setCopy(obj);
      navigate(`?${serializerRef.current(obj).toString()}`);
    },
    [parsedParams, targetValue, setCopy, navigate, serializerRef]
  );
  const syncValue = useCallback(() => setValue(() => copy), [copy, setValue]);

  return {
    copy,
    setCopy,
    value: targetValue,
    setValue,
    syncValue,
  };
}

type simpleValue = string | number | string[] | boolean | undefined;

export function useSimpleJsonQuery<T extends Record<string, simpleValue>>(initial: T) {
  const [innerInitial, setInitial] = useState(initial);
  useDeepCompareEffect(() => setInitial(initial), [initial]);

  const simpleParser = useCallback(
    (params: URLSearchParams): T => {
      const keys = Object.keys(innerInitial);
      const result: Record<string, simpleValue> = {};
      for (const key of keys) {
        const originalValue = innerInitial[key];
        if (params.has(key)) {
          if (Array.isArray(originalValue)) {
            result[key] = params.get(key)!.split(',');
          } else if (isNumber(originalValue)) {
            result[key] = parseInt(params.get(key)!, 10);
          } else if (isBoolean(originalValue)) {
            result[key] = params.get(key) === 'true';
          } else {
            result[key] = params.get(key)!;
          }
        }
      }
      return result as T;
    },
    [innerInitial]
  );

  const simpleSerializer = useCallback((data: T): URLSearchParams => {
    const res = cloneDeep(data);
    for (const i in res) {
      if (isZeroValue(res[i])) {
        delete res[i];
      }
    }
    return new URLSearchParams(res as Record<string, string>);
  }, []);

  return useJsonQuery(simpleParser, simpleSerializer, initial);
}
