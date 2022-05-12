import { atom, useAtom } from 'jotai';

const collapsed = atom(false);

export function useCollapsed() {
  const [value, setValue] = useAtom(collapsed);

  function setCollapsed(v?: boolean) {
    setValue(v === undefined ? !value : v);
  }

  return [value, setCollapsed] as const;
}
