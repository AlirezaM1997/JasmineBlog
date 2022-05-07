import React, { useState } from "react";

const Context = React.createContext();

export default function Provider({ children }) {
  const [userInfo, setUserInfo] = useState();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState();
  const [userId, setUserId] = useState();
  const [slideNumber, setSlideNumber] = useState(1);

  return (
    <Context.Provider
      value={{
        userInfo,
        setUserInfo,
        token,
        setToken,
        loading,
        setLoading,
        userId,
        setUserId,
        slideNumber,
        setSlideNumber,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAllState() {
  return React.useContext(Context);
}
