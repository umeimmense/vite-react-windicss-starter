# @web/common 使用说明

## 目录结构

```
common
├── node_modules
├── package.json
├── src
│   ├── hooks // 内置hooks
│   ├── index.ts // 主文件
│   ├── utils // 内置方法
│   └── viteConfig // 公有vite配置
└── tsconfig.json // package common typeScript 配置文件
```

## hooks 案例

### useSimpleJsonQuery

#### 用法

```tsx
import { Button, Card, Col, Input, Row, Select, Space, Table, Tag, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { useMemo } from 'react';
import useSWR from 'swr';

import { useSimpleJsonQuery } from '@web/common';
import { Page } from '@web/components';

import { WeChatOrderStatusTextEnum, WechatOrderMainType, WechatOrderSubType } from '@/interface/order';

export const WechatUserOrder = () => {
  const { copy, setCopy, value, setValue, syncValue } = useSimpleJsonQuery({
    id: '',
  });

  const handleSearch = () => {
    syncValue();
  };
  return (
    <Space>
      <span className='mr-2 text-right min-w-15'>id:</span>
      <Input
        allowClear
        placeholder='请输入id'
        className='flex-1'
        value={copy.id}
        onChange={(e) => {
          setCopy('id', e.target.value);
        }}
      />
      <Button type='primary' onClick={() => handleSearch()}>
        查询
      </Button>
    </Space>
  );
};
```

## 新增 common 配置

1. src 文件目录下新增文件夹:例如 test
2. test 目录下新建 index.ts
3. src 文件目录下 index.ts 中引入 test 文件

```typescript
// src/index.ts
export * from './test';
```
