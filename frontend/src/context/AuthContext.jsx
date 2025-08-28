import { createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
    },
        []
    );

    const login = (data) =>{
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
    };

    const logout =() =>{
        localStorage.removeItem("user");
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}