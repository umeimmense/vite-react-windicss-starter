import { Button, Result } from 'antd';

export function NotFound() {
  const onBack = () => {
    window.location.href = '/';
  };
  return (
    <div className='flex justify-center items-center h-full'>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button type='primary' onClick={onBack}>
            Back Home
          </Button>
        }
      />
    </div>
  );
}
