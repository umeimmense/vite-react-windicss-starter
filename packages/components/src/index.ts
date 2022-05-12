import { CSSProperties, ReactNode } from 'react';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}
export * from './ErrorBoundary';
export * from './NotFound';
export * from './Forbidden';
export * from './Page';
export * from './CustomCard';
export * from './route';
