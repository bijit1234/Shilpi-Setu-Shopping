import React, { Component } from 'react';
import { Translation } from 'react-i18next';
class ErrorBoundary extends Component {
    state = {
        hasError: false
    };
    static getDerivedStateFromError(_) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback || (<Translation>
          {(t) => (<div className="p-8 text-center bg-[var(--card)] rounded-2xl border border-[var(--border)] my-8">
              <h2 className="text-xl font-bold text-[var(--text)] mb-2">{t('errorBoundary.title')}</h2>
              <p className="text-[var(--muted)] mb-4">{t('errorBoundary.description')}</p>
              <button onClick={() => this.setState({ hasError: false })} className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors">
                {t('errorBoundary.retry')}
              </button>
            </div>)}
        </Translation>);
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
