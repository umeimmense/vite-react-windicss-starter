import { Layout, Menu } from 'antd';
import { useMemo } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import 'virtual:windi.css';

import IconFont from '@web/common/src/iconfont';
import { MenuItem, findRouteWithPath } from '@web/components';

import '@/assets/global.less';
import '@/assets/sidebar.less';
import { Header } from '@/components/Header';
import { Menu as MenuList } from '@/routes';
import { useCollapsed, usePermission } from '@/store';

import './antd.less';
import './style.less';

const { Content, Sider } = Layout;

export const BasicLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useCollapsed();
  const { hasPermission } = usePermission();

  const matchRoute = useMemo(() => findRouteWithPath(MenuList, location.pathname), [location.pathname]);
  const selectedKeys = useMemo(
    () => (matchRoute?.path || matchRoute?.key ? [matchRoute?.key ?? matchRoute.path ?? ''] : []),
    [matchRoute]
  );
  return (
    <Layout className='min-h-100vh'>
      <Sider id='main-sidebar' collapsible collapsed={collapsed} onCollapse={setCollapsed} trigger={null}>
        <Menu theme='dark' selectedKeys={selectedKeys} mode='inline'>
          <Menu.Item key='logo'>
            <Link to='/'>
              <IconFont type='icon-san' />
              <span>项目名称</span>
            </Link>
          </Menu.Item>
          {MenuList.filter((c) => !c.hidden)
            .filter((router) => !router.permission || hasPermission(router.permission))
            .map((router) => {
              return <MenuItem key={router.key ?? router.path ?? router.name} route={router} title={router.name} />;
            })}
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header />
        <Content className='site-layout-container'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
