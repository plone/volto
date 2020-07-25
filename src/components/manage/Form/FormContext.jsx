import React from 'react';

export const FormStateContext = React.createContext();

export const FormStateProvider = (props) => {
  const { initialValue } = props;
  const [contextData, setContextData] = React.useState(initialValue);

  const logger = (val) => {
    setContextData((data) => ({ ...data, ...val }));
  };

  return (
    <FormStateContext.Provider value={{ contextData, setContextData: logger }}>
      {props.children}
    </FormStateContext.Provider>
  );
};

export const useFormStateContext = () => {
  const context = React.useContext(FormStateContext);

  if (!context) {
    throw new Error(
      `The \`useFormStateContext\` hook must be used inside the <FormStateProvider> component's context.`,
    );
  }

  return context;
};
