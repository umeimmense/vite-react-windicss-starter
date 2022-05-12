import { AxiosError } from 'axios';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

import { User as IUser, getUser } from '@/api';

const defaultUser: IUser = {
  id: 0,
  email: '',
  displayName: '',
  permissions: ['demoPagePermission'],
};

const result = atom<{ loading: boolean; error: AxiosError | null; data: IUser | null }>({
  loading: true,
  error: null,
  data: null,
});
const user = atom(
  (get) => get(result),
  (_get, set) => {
    const fetchData = async () => {
      set(result, (prev) => ({ ...prev, loading: true }));
      try {
        const data = await getUser();
        set(result, { loading: false, error: null, data });
      } catch (error: any) {
        set(result, { loading: false, error, data: null });
      }
    };
    fetchData();
  }
);
user.onMount = (runFetch) => {
  runFetch();
};

export function useUser() {
  const [loadable] = useAtom(user);

  return {
    user: loadable.data ?? defaultUser,
    loading: loadable.loading,
    forbidden: loadable.error && loadable.error.response?.status === 403,
  };
}

export function usePermission() {
  const [loadable] = useAtom(user);

  return {
    hasPermission: useCallback(
      (permission: string[]) => permission.every((item: string) => loadable?.data?.permissions.includes(item)),
      [loadable?.data?.permissions]
    ),
  };
}
