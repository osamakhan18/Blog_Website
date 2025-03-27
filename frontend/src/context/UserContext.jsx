import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

// Create UserContext
export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
   const [user, setUser] = useState(null);

   // Fetch user data on mount
   useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/auth/api/refetch", { 
           withCredentials: true 
        });
         setUser(res.data);
      } catch (error) {
       console.error("Error fetching user:", error);
        setUser(null);
       }
     };

     getUser();
   }, []);

   return (
     <UserContext.Provider value={{ user, setUser }}>
       {children}
     </UserContext.Provider>
   );
}