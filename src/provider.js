import React, { useState } from "react";

const Context = React.createContext();

export default function Provider({ children }) {
  const [auth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
  });
  const [token, setToken] = useState("");
  return (
    <Context.Provider
      value={{
        auth,
        setAuth,
        currentUser,
        setCurrentUser,
        token,
        setToken,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAllState() {
  return React.useContext(Context);
}
