
import { createContext, useState } from "react";


export const UserContext = createContext(null);


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]); 
    function aleerta(numbere){
        console.log("PermissionStatus",numbere)
        setUser([1,2,3]);
    }
  return (
    <UserContext.Provider value={{ user, setUser, aleerta}}>
      {children}
    </UserContext.Provider>
  );
};
