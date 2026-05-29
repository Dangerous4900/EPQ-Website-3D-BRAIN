import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black p-8 text-center text-white">
          <div className="max-w-md p-8 rounded-2xl border border-red-500/30 bg-red-950/10 backdrop-blur-md shadow-xl">
            <h2 className="text-2xl font-semibold text-red-400 mb-4">Application Error</h2>
            <p className="text-white/80 mb-6 text-sm">
              We encountered an issue while rendering the 3D Brain Atlas application.
            </p>
            <pre className="text-xs bg-black/80 p-4 rounded-lg border border-white/10 text-red-300 overflow-x-auto text-left max-h-40 mb-6 font-mono">
              {this.state.error?.message || String(this.state.error)}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm shadow-md"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
