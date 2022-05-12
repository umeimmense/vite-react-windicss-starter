import { matchPath } from 'react-router-dom';

export interface IRoute {
  name: string;
  path?: string;
  icon: React.ReactNode;
  children?: IRoute[];
  component?: JSX.Element;
  permission?: string[];

  // 是否在菜单显示这条路由
  hidden?: boolean;

  // 三级菜单
  leaf?: boolean;

  // 当没有 path 时，最好指定一个 key
  // 如果两个不同的路由具有相同的 key（其中具有 hidden 属性），侧边栏会在这两个路由的页面都进行高亮
  key?: string;
}

// flat IRoute tree into IRoute[]
export function flatRouteTree(tree: IRoute | IRoute[]): IRoute[] {
  const ret: IRoute[] = [];
  function unWrapInner(root: IRoute, list: IRoute[]) {
    list.push(root);
    for (const r of root.children ?? []) {
      unWrapInner(r, list);
    }
  }

  tree = Array.isArray(tree) ? tree : [tree];
  for (const r of tree) {
    unWrapInner(r, ret);
  }
  return ret;
}

export function findRouteWithPath(routes: IRoute[], path: string): IRoute | null {
  const queue = routes.slice();
  let route = queue.shift();
  while (route) {
    if (route.path && matchPath(path, route.path)) {
      return route;
    } else if (route.leaf && route.children?.some((r) => matchPath(path, r.path ?? ''))) {
      return route;
    }

    if (route.children) {
      queue.push(...route.children);
    }

    route = queue.shift();
  }

  return null;
}

export function findRouteMajorPath(route: IRoute): string {
  if (!route.leaf || !route.children?.length) {
    return route.path ?? '';
  }

  return findRouteMajorPath(route.children[0]);
}

export function findRoutesChainWithPath(routes: IRoute[], path: string): IRoute[] {
  function find(routes: IRoute[], path: string, parents: IRoute[]): IRoute[] {
    for (const route of routes) {
      if (route.path === path) {
        return [...parents, route];
      } else if (route.children) {
        const ret = find(route.children ?? [], path, [...parents, route]);
        if (ret.length > 0) {
          return ret;
        }
      }
    }

    return [];
  }

  return find(routes, path, []);
}

export * from './menuitem';
