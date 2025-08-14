import React from 'react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';

function FallbackComponent({ error }: FallbackProps) {
  return (
    <div style={{ padding: '1rem', color: 'red' }}>
      <h2>Something went wrong in InputField.</h2>
      <details style={{ whiteSpace: 'pre-wrap' }}>
        {error.toString()}
      </details>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={(error, info) => {
        console.error('ErrorBoundary caught error:', error, info);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
