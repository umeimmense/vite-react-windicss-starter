import { Menu } from 'antd';
import type { MenuItemProps } from 'antd/lib/menu/MenuItem';
import { Link } from 'react-router-dom';

import { IRoute } from './';

export function MenuItem({ route, ...props }: { route: IRoute } & MenuItemProps) {
  if (!route.children || route.leaf) {
    return (
      <Menu.Item {...props} disabled={!route.path && !route.leaf}>
        {route.path || route.leaf ? (
          <Link to={route.path ?? route.children?.[0]?.path ?? ''}>
            {route.icon}
            <span>{route.name}</span>
          </Link>
        ) : (
          <>
            {route.icon}
            <span>{route.name}</span>
          </>
        )}
      </Menu.Item>
    );
  }

  return (
    <Menu.SubMenu icon={route.icon} title={route.name} {...props}>
      {route.children
        .filter((c) => !c.hidden)
        .map((r, idx) => (
          <MenuItem route={r} key={r.key ?? r.path ?? idx} />
        ))}
    </Menu.SubMenu>
  );
}
