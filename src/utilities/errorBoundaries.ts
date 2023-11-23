import React from 'react';

interface Props {
  children: React.ReactNode;
  fallbackComponent: React.ReactNode;
  resetCondition?: any;
  error: boolean;
}

interface State {
  hasError: boolean;
  resetCondition?: any;
}

// This is for errors in javascript during render or hook (useEffect etc.)
//

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, resetCondition: props.resetCondition };
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error);
    return { hasError: true };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.resetCondition !== state.resetCondition) {
      return { hasError: false, resetCondition: props.resetCondition };
    }
  }

  render() {
    if (this.state.hasError || this.props.error) {
      return this.props.fallbackComponent;
    }

    return this.props.children;
  }
}
