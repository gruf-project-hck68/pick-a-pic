import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const user = localStorage.getItem('email') || ""
  console.log(currentUser, "<< INI USER CONTEXT");

  return (
    <UserContext.Provider value={{ user, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

