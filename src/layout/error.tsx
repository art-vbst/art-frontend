import * as React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // log
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export const ErrorBoundary = (props: ErrorBoundaryProps) => {
  return <ErrorBoundaryClass {...props} />;
};
