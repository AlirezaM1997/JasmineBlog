import React, { useState } from "react";

const Context = React.createContext();

export default function Provider({ children }) {

  const [auth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
  });

  return (
    <Context.Provider
      value={{
        auth,
        setAuth,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAllState() {
  return React.useContext(Context);
}
