import React, { useState } from "react";

const Context = React.createContext();

export default function Provider({ children }) {
  const [userInfo, setUserInfo] = useState();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState();

  return (
    <Context.Provider
      value={{
        userInfo,
        setUserInfo,
        token,
        setToken,
        loading,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAllState() {
  return React.useContext(Context);
}
