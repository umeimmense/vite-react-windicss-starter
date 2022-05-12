import { Card } from 'antd';

import { BaseComponentProps } from '../';

interface CustomCardProps extends BaseComponentProps {
  bodyStyle?: React.CSSProperties;
  title?: React.ReactNode;
  extre?: React.ReactNode;
}
export const CustomCard = (props: CustomCardProps) => {
  return (
    <Card bodyStyle={props.bodyStyle ?? { padding: '8px 16px' }} bordered={false} className={props.className}>
      <div className='flex justify-between py-2'>
        <div className='flex justify-start items-center'>
          <span className='text-base font-bold'>{props.title}</span>
        </div>
        <div className='flex'>{props.extre}</div>
      </div>
      {props.children}
    </Card>
  );
};
