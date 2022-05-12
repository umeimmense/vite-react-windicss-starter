import { Button, Result } from 'antd';
import { Component, ErrorInfo } from 'react';

interface ErrorBoundaryState {
  error: Error | null;
}

interface ErrorBoundaryProps {
  onError?: (message: { error: string; errorInfo: ErrorInfo }) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  onRefresh = () => {
    window.location.href = '/';
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.({
      error: error.message,
      errorInfo,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className='flex justify-center items-center min-h-100vh'>
          <Result
            status='500'
            title='Error'
            subTitle={this.state.error.message || ''}
            extra={
              <Button type='primary' onClick={this.onRefresh}>
                Back to homePage
              </Button>
            }
          />
        </div>
      );
    }
    return this.props.children;
  }
}
