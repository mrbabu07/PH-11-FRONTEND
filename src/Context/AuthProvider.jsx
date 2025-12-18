import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("donor");
  const [userStatus, setUserStatus] = useState("active");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        try {
          const res = await axios.get(`http://localhost:5000/users/role/${currentUser.email}`);
          if (res.data) {
            setRole(res.data.role || "donor");
            setUserStatus(res.data.status || "active");
          }
        } catch (err) {
          setRole("donor");
          setUserStatus("active");
        }
      } else {
        setRole("donor");
        setUserStatus("active");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, userStatus, loading }}>
      {children}
    </AuthContext.Provider>
  );
};