"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="max-w-lg mx-auto px-6 py-20 text-center">
          <div className="w-16 h-16 mx-auto bg-stone-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">—</span>
          </div>
          <h2 className="text-xl font-bold mb-2 text-stone-900">Something went wrong</h2>
          <p className="text-stone-500 mb-6">Please refresh the page or try again later.</p>
          <button onClick={() => this.setState({ hasError: false })} className="px-6 py-2.5 bg-stone-900 text-white rounded-full font-semibold text-sm hover:bg-stone-800 transition">
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
