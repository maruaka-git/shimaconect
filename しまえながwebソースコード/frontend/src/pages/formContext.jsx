import React, { createContext, useContext, useReducer } from 'react';

const FormStateContext = createContext();
const FormDispatchContext = createContext();

const FormReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FORM_VALUES':
      return { ...state, formValues: { ...state.formValues, ...action.payload } };
    default:
      return state;
  }
};

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FormReducer, {
    formValues: { handSignName: '', category: '', detail: '', hashTag1: '', hashTag2: '', hashTag3: '', hashTag4: '' },
  });

  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>{children}</FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
};

export function useFormState () {
  const context = useContext(FormStateContext);
  if (!context) {
    throw new Error('useFormStateはFormProvider内で使用する必要があります');
  }
  return context;
};

export const useFormDispatch = () => {
  const context = useContext(FormDispatchContext);
  if (!context) {
    throw new Error('useFormDispatchはFormProvider内で使用する必要があります');
  }
  return context;
};
