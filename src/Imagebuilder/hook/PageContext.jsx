// context/PageContext.js
import React, { createContext, useContext, useState } from 'react';

// PageContext.js
const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const path = location?.pathname?.split("/").pop();
  const [currentPage, setCurrentPage] = useState(path || "all");
  const [pageStateChanged, setPageStateChanged] = useState(false); // or timestamp, or object

  return (
    <PageContext.Provider value={{
      currentPage,
      setCurrentPage,
      pageStateChanged,
      setPageStateChanged
    }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);
