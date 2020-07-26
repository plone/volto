import React from 'react';

export const FormStateContext = React.createContext();

export class FormStateProvider extends React.Component {
  constructor(props) {
    super(props);
    const { initialValue } = this.props;
    this.state = { contextData: initialValue };
  }

  setContextData = (value) => {
    return new Promise((resolve, reject) => {
      this.setState((state) => {
        return {
          ...state,
          contextData: {
            ...(state.contextData || {}),
            ...value,
          },
        };
      }, resolve);
    });
  };

  render() {
    const { contextData } = this.state;

    return (
      <FormStateContext.Provider
        value={{ contextData, setContextData: this.setContextData }}
      >
        {this.props.children}
      </FormStateContext.Provider>
    );
  }
}

export const useFormStateContext = () => {
  const context = React.useContext(FormStateContext);

  if (!context) {
    throw new Error(
      `The \`useFormStateContext\` hook must be used inside the <FormStateProvider> component's context.`,
    );
  }

  return context;
};
