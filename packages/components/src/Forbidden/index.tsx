import { Button, Result } from 'antd';

export function Forbidden() {
  const onBack = () => {
    window.location.href = '/';
  };

  return (
    <div className='flex justify-center items-center h-full'>
      <Result
        status='403'
        title='403'
        subTitle='Sorry, you are not authorized to access this page.'
        extra={
          <Button type='primary' onClick={onBack}>
            Back Home
          </Button>
        }
      />
    </div>
  );
}
