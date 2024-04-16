import React, { useState, useCallback, createContext, useContext } from 'react';

// Create the context
export const TourContext = React.createContext();

// Export a provider and a custom hook to use the context
export const useTour = () => React.useContext(TourContext);

export const TourProvider = ({ children }) => {
  const [driverObj, setDriverObj] = React.useState(null);

  const startTour = useCallback(() => {
    if (driverObj) {
      driverObj.drive();
    }
  }, [driverObj]);

  const initializeTour = useCallback((driver) => {
    setDriverObj(driver);
  }, []);

  return (
    <TourContext.Provider value={{ initializeTour, startTour }}>
      {children}
    </TourContext.Provider>
  );
};
