import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, ExternalLink, RefreshCw, Layers } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebGL Canvas initialization error caught:', error, errorInfo);
  }

  private handleOpenNewTab = () => {
    // Standard secure way to open the full app url in a clean tab bypasses iframe sandbox limits
    window.open(window.location.href, '_blank', 'noopener,noreferrer');
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#09090b] text-white p-6 md:p-12 font-sans overflow-y-auto">
          {/* Ambient visual background */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-20 -left-25 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />

          <div className="relative w-full max-w-xl p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl space-y-6">
            {/* Upper Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-200 w-fit text-xs font-mono font-medium tracking-wider">
              <ShieldAlert size={14} className="animate-pulse" />
              WebGL ACCELERATION RESTRICTED
            </div>

            {/* Error Message Header */}
            <div>
              <h2 className="text-2xl md:text-3xl font-serif tracking-tight text-white mb-2">
                WebGL Context Blocked
              </h2>
              <p className="text-sm text-white/60 leading-relaxed">
                Your browser or active security environment restricted access to the 3D graphics hardware accelerator. This frequently occurs inside sandboxed iframes.
              </p>
            </div>

            {/* Technical Exception Box */}
            <div className="p-4 rounded-xl bg-black/50 border border-white/5 font-mono text-xs text-amber-300/80 max-h-24 overflow-y-auto">
              <p className="font-semibold text-white/50 uppercase tracking-wider mb-1 text-[10px]">Technical Context:</p>
              <p className="leading-relaxed font-mono">
                {this.state.error?.message || "THREE.WebGLRenderer: Context creation failed."}
              </p>
            </div>

            {/* Priority Direct Solutions */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs uppercase tracking-widest text-white/40 font-semibold font-mono">
                Empirical Solutions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Option 1: Open in New Tab */}
                <button
                  onClick={this.handleOpenNewTab}
                  className="flex flex-col items-start p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left group"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                      <ExternalLink size={16} />
                    </span>
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono font-medium">RECOMMENDED</span>
                  </div>
                  <h4 className="text-sm font-medium text-white group-hover:text-amber-300 transition-colors">
                    Open in New Tab
                  </h4>
                  <p className="text-xs text-white/50 mt-1">
                    Bypasses all iframe sandbox policies and grants full GPU access.
                  </p>
                </button>

                {/* Option 2: Reload */}
                <button
                  onClick={() => window.location.reload()}
                  className="flex flex-col items-start p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left group"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                      <RefreshCw size={16} />
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                    Retry Rendering
                  </h4>
                  <p className="text-xs text-white/50 mt-1">
                    Triggers a complete browser repaint and attempts setup reload.
                  </p>
                </button>
              </div>

              {/* Troubleshooting Reference */}
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                  <Layers size={14} className="text-amber-500" />
                  <span>Alternative Fixes Checklist</span>
                </div>
                <ul className="text-xs text-white/50 space-y-2.5 pl-5 list-disc leading-relaxed">
                  <li>
                    <span className="text-white/80 font-medium">Enable Hardware Acceleration:</span> Confirm that Chrome's "Use graphics acceleration when available" is enabled in <span className="font-mono text-[11px] bg-white/5 px-1 py-0.5 rounded">Settings &gt; System</span>.
                  </li>
                  <li>
                    <span className="text-white/80 font-medium">Verify Chrome Flags:</span> Search <span className="font-mono text-[11px] bg-white/5 px-1 py-0.5 rounded">chrome://gpu</span> in your address bar to see if hardware acceleration is blocked by policies.
                  </li>
                </ul>
              </div>
            </div>

            {/* Subtle Brain Outline Graphic fallback */}
            <div className="pt-2 text-center text-[10px] font-mono text-white/30 tracking-widest">
              3D-BRAIN VISUALIZER PIPELINE
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
