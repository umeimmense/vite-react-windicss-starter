import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { CustomCard, Page } from '@web/components';

import { DemoType } from '@/interface/demo';

export const Demo = () => {
  const columns: ColumnsType<DemoType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      key: 'id',
    },
    {
      title: 'DemoName',
      dataIndex: 'name',
      align: 'center',
      key: 'name',
    },
  ];

  return (
    <Page>
      <CustomCard title='Demo信息'>
        <Table size='small' rowKey='id' columns={columns} dataSource={[]} pagination={false} />
      </CustomCard>
    </Page>
  );
};
