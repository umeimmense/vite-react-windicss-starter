import { Spin } from 'antd';

import { BaseComponentProps } from '..';

interface PageProps extends BaseComponentProps {
  loading?: boolean;
}

export function Page(props: PageProps) {
  const { children, loading } = props;

  return (
    <div className='p-4 min-h-full bg-gray-100'>
      <Spin spinning={loading ?? false}>{children}</Spin>
    </div>
  );
}
