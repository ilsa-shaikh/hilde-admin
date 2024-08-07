import { createContext, useContext, useState } from "react";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [headerData, setHeaderData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("Data"));
    return storedData || {};
  });

  const updateHeaderData = (updatedData) => {
    setHeaderData((prevData) => {
      const newData = {
        ...prevData,
        ...updatedData,
      };
      localStorage.setItem("Data", JSON.stringify(newData));
      return newData;
    });
  };

  return (
    <HeaderContext.Provider value={{ headerData, updateHeaderData }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderData = () => {
  return useContext(HeaderContext);
};
