import React, { createContext, useContext, useState } from 'react';

const TempContext = createContext();

export const TempProvider = ({ children }) => {
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit

  const toggleUnit = () => {
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  };

  const convertTemp = (celsius) => {
    if (unit === 'C') return Math.round(celsius);
    return Math.round((celsius * 9/5) + 32);
  };

  const value = {
    unit,
    toggleUnit,
    convertTemp,
  };

  return (
    <TempContext.Provider value={value}>
      {children}
    </TempContext.Provider>
  );
};

export const useTemp = () => {
  const context = useContext(TempContext);
  if (!context) {
    throw new Error('useTemp must be used within TempProvider');
  }
  return context;
};
