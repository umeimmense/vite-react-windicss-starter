# vite-react-windicss-starter

<strong>快速创建基于 vite+pnpm+typescript 的 Monorepo</strong>

## 项目结构

```
vite-react-windicss-starter
├── REACME.md // 项目简介
├── docs // Package 使用文档
├── package.json // 项目依赖
├── packages // packages
├── pnpm-lock.yaml // pnpm 生成的 lock 文件
├── pnpm-workspace.yaml // pnpm workspace 配置文件
├── tsconfig.base.json // tsconfig 基础配置
├── tsconfig.eslint.json // eslint tsconfig 配置
├── tsconfig.json // 项目 tsconfig 配置
└── windi.config.ts // windicss 配置
```

## 初始化项目

```bash
git clone https://github.com/umeimmense/vite-react-windicss-starter.git
```

```bash
npm install -g pnpm
```

```bash
pnpm install
```

```bash
pnpm start:package-template
```

## 安装依赖

> 仅支持 PNPM 包管理器

- 全局安装第三方包

```bash
pnpm add -w <package-name>
```

- package 内安装依赖

```bash
// @web/package-template 为package中的package
pnpm add <package-name> --filter  @web/package-template
```

- 安装本地包

```bash
// @web/package-template 为package中的package
pnpm install "@web/components@*" -r --filter @web/package-template

```

## 内置工具方法（package/common）

```tsx
//  引入
import { useSimpleJsonQuery } from '@web/common';

const { copy, setCopy, value, setValue, syncValue } = useSimpleJsonQuery({
  key: '',
});

setCopy('key', updateValue);
setValue((draft) => {
  draft.key = updateValue;
});
```

[更多内置方法请看](./packages/common/README.md)

## 通用组件（package/component）

```tsx
import { Page } from '@web/components';

export const Demo = () => {
  return <Page></Page>;
};
```

## 代码格式化

> 内置 ESLint + prettier 可进行代码格式化

### Eslint

- [ESLint 配置文件](./.eslintrc)
- [ESLint 文档](https://eslint.org/docs/rules/)

### prettier

- [prettier 配置文件](./.prettierrc.js)
- [prettier 文档](https://prettier.io/docs/en/options.html)

## tsconfig 配置说明

- [tsconfig.json 配置](./tsconfig.json)
- [tsconfig 文档](https://www.typescriptlang.org/tsconfig)

## 项目依赖

#### 构建

- [vite](https://vitejs.dev/)
- [pnpm](https://pnpm.io/)
- [typescript](https://www.typescriptlang.org/)

#### react 相关

- [react](reactjs.org)
- [react-router](https://reactrouter.com/)
- [antd](https://ant.design/index-cn)

#### 工具方法

- [moment](https://momentjs.com/)
- [lodash](https://lodash.com/)
- [windicss](https://windicss.org/)

#### 网络请求

- [swr](https://swr.vercel.app/zh-CN)
- [axios](https://axios-http.com/)
