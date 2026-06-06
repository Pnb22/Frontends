import React from "react";

export default class RemoteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="remote-state remote-state--error">
          <strong>{this.props.title || "Micro frontend indisponível"}</strong>
          <span>Confirme se a aplicação remota está rodando na porta configurada.</span>
        </div>
      );
    }

    return this.props.children;
  }
}
