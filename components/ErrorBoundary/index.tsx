import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    console.log(error);
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <div>
          <h2>error</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    return (this.props as any).children;
  }
}

export default ErrorBoundary;
