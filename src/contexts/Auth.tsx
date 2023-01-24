import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = React.createContext<User | null>(null);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
