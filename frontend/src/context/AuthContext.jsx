import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("auth");
        if (savedUser) {
            setAuth(JSON.parse(savedUser));
        }
        setLoading(false);
    },
        []
    );

    const login = (data) =>{
        const authData = {
            token: data.token,
            user: {
                id: data.id,
                username: data.username,
                email: data.email,
            }
        };

        localStorage.setItem("auth", JSON.stringify(authData));
        setAuth(authData);
    };

    const logout = () => {
        setLoading(true);
        localStorage.removeItem("auth");
        setAuth(null);

        setTimeout(()=>{
            setLoading(false);
        },500);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};