import React, { useState, createContext } from "react";

export const DefUserContext = createContext();

const DefaultUserProvider = ({ children }) => {
  const [defUser, setDefUser] = useState(localStorage.getItem("defUser") !== null ? localStorage.getItem("defUser") : "dudu");
  return (
    <DefUserContext.Provider
      value={{
        defUser,
        setDefUser: (val) => {
          setDefUser(val);
          localStorage.setItem("defUser", val);
        },
      }}
    >
      {children}
    </DefUserContext.Provider>
  );
};

export default DefaultUserProvider;
