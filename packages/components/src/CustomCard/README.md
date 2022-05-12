## CustomCard

## 何时使用

在使用 Antd Card 过程中 并且存在 extre 配置额外操作但 不希望 Card Header 和 Card Body 间存在分割线时可使用

## API

CustomCard 的属性说明如下：

| 属性      | 说明                 | 类型          | 默认值 | 版本 |
| --------- | -------------------- | ------------- | ------ | ---- |
| bodyStyle | 内容区域自定义样式   | CSSProperties | -      |      |
| extra     | 卡片右上角的操作区域 | ReactNode     | -      |      |
| title     | 卡片标题             | ReactNode     |

## Usage

```typescript
import { CustomCard } from '@web/components';

export const Demo = () => {
  return (
    <CustomCard
      titie='标题'
      extre={
        <>
          <span>操作</span>
        </>
      }
    >
      {' '}
    </CustomCard>
  );
};
```
