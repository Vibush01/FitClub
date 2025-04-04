import { createContext, useContext, useState, useEffect } from 'react';

     const AuthContext = createContext();

     export const AuthProvider = ({ children }) => {
       const [user, setUser] = useState(null);
       const [token, setToken] = useState(null);

       useEffect(() => {
         // Load user and token from localStorage on initial render
         const storedToken = localStorage.getItem('token');
         const storedUser = localStorage.getItem('user');
         if (storedToken && storedUser) {
           setToken(storedToken);
           setUser(JSON.parse(storedUser));
         }
       }, []);

       const login = (token, user) => {
         setToken(token);
         setUser(user);
         localStorage.setItem('token', token);
         localStorage.setItem('user', JSON.stringify(user));
       };

       const logout = () => {
         setToken(null);
         setUser(null);
         localStorage.removeItem('token');
         localStorage.removeItem('user');
       };

       return (
         <AuthContext.Provider value={{ user, token, login, logout }}>
           {children}
         </AuthContext.Provider>
       );
     };

     export const useAuth = () => useContext(AuthContext);