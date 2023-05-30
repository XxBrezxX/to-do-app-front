import React, { createContext, useState } from 'react';

export const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    dueDateSort: null,
    prioritySort: null,
    name: '',
    priority: '',
    isDone: ''
  });

  return (
    <FormDataContext.Provider value={[formData, setFormData]}>
      {children}
    </FormDataContext.Provider>
  );
};
