# package-template

## 目录结构

```
src
├── api          // 接口
├── assets       // 资源文件
├── components   // 项目通用组件
├── constant     // 全局通用定义
├── img          // 图片
├── interface    // ts 相关定义
├── modules      // 页面
└── store        // store

```

## 权限管理

项目内置路由权限设置,见[路由配置](./src/routes.tsx),如果页面需要做权限管理需加上 permission 字段，若不配置则不做权限控制。

### 配置

[路由配置](./src/routes.tsx)

```tsx
{
    name: 'Demo页面',
    icon: <BankOutlined />,
    path: Path.demo(),
    component: <Demo />,
    permission: ['demoPagePermission'],
},
```

权限控制实现为：根据后端返回 permission list 路由根据[usePermission](./src/store/user.ts)判断是有权限访问

```tsx
const { hasPermission } = usePermission();
```
