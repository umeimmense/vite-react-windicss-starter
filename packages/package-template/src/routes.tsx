import { BankOutlined } from '@ant-design/icons';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { IRoute, flatRouteTree } from '@web/components';

import { Forbidden, NotFound } from '@/modules';
import { Demo } from '@/modules';
import { usePermission } from '@/store';

import { BasicLayout } from './app';

const urlWithQuery = (path: string, query?: URLSearchParams) => (query ? `${path}?${query.toString()}` : path);
const pathFactory = (path: string) => (query?: URLSearchParams) => urlWithQuery(path, query);

export const Path = {
  demo: pathFactory('/demo'),
} as const;

export const Menu: IRoute[] = [
  {
    name: 'Demo页面',
    icon: <BankOutlined />,
    path: Path.demo(),
    component: <Demo />,
    permission: ['demoPagePermission'],
  },
];

export const RouterComponent = () => {
  const { hasPermission } = usePermission();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BasicLayout />}>
          {flatRouteTree(Menu)
            .filter((r) => r.path && r.component)
            .map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={!route.permission || hasPermission(route.permission) ? route.component : <Forbidden />}
              ></Route>
            ))
            .concat([
              <Route key='redirect' path='/' element={<Navigate to={Path.demo()} replace />} />,
              <Route key='404' path='*' element={<NotFound />} />,
            ])}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
