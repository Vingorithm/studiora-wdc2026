import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // In production you would send this to an error reporting service
    console.error('[Studiora ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center mb-6 text-4xl">
          ⚠️
        </div>
        <h2 className="text-xl font-bold font-poppins text-darkText mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-slate-400 font-inter max-w-xs mb-6 leading-relaxed">
          This section ran into an unexpected error. Your data is safe — try reloading the page.
        </p>
        {this.props.showDetails && this.state.error && (
          <pre className="text-xs text-left text-red-400 bg-red-50 rounded-xl p-4 max-w-sm overflow-auto mb-6">
            {this.state.error.message}
          </pre>
        )}
        <button
          onClick={() => window.location.reload()}
          className="btn-primary text-sm py-2.5 px-6"
        >
          Reload page
        </button>
      </div>
    )
  }
}