import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Tabs } from 'antd';
import classnames from 'classnames';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { findRouteMajorPath, findRouteWithPath } from '@web/components';

import { Menu } from '@/routes';
import { useCollapsed } from '@/store';

import './style.less';

export interface HeaderProps {
  className?: string;
}

export function Header(props: HeaderProps) {
  const [collapsed, setCollapsed] = useCollapsed();
  const location = useLocation();
  const navigate = useNavigate();

  const currentRoute = useMemo(() => findRouteWithPath(Menu, location.pathname), [location.pathname]);

  const tabs = useMemo(() => currentRoute?.children?.filter((c) => !c.leaf && !c.hidden) ?? [], [currentRoute]);
  const showTabs = useMemo(() => tabs.length > 1, [tabs.length]);
  function handleTabClick(key: string) {
    navigate({ pathname: key });
  }

  return (
    <Layout.Header className={classnames('able-header', props.className)}>
      <div className='able-header-main'>
        <div>
          {collapsed ? (
            <MenuUnfoldOutlined className='able-header-collapse' onClick={() => setCollapsed()} />
          ) : (
            <MenuFoldOutlined className='able-header-collapse' onClick={() => setCollapsed()} />
          )}
          <span className='able-header-main-name'>{currentRoute?.name}</span>
        </div>
      </div>
      {showTabs && (
        <Tabs className='able-header-tabs' activeKey={location.pathname} onTabClick={handleTabClick}>
          {tabs.map((tab) => (
            <Tabs.TabPane tab={tab.name} key={findRouteMajorPath(tab)} />
          ))}
        </Tabs>
      )}
    </Layout.Header>
  );
}
