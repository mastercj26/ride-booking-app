import React, { useState, createContext } from "react";

export const CaptionDataContext = createContext();

const CaptionContext = ({ children }) => {
  const [caption, setCaption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaption = (newCaption) => {
    setCaption(newCaption);
  };

  const data = {
    caption,
    setCaption,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaption,
  };

  return (
    <CaptionDataContext.Provider value={data}>
      {children}
    </CaptionDataContext.Provider>
  );
};

export default CaptionContext;
