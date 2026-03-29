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
      return this.props.fallback || (
        <div className="fixed inset-0 flex items-center justify-center bg-black text-white p-8 z-[9999]">
          <div className="max-w-md w-full glass-panel p-8 border border-red-500/30">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Application Error</h2>
            <p className="text-white/70 mb-6">
              Something went wrong while rendering the 3D model. This is often caused by missing or corrupted model files.
            </p>
            <div className="bg-black/40 p-4 rounded text-xs font-mono overflow-auto max-h-40 text-red-300">
              {this.state.error?.message}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 w-full py-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded transition-colors"
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
