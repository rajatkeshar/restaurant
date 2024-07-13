import Footer from "../structure/Footer";
import Headers from "../structure/Headers";
import { RenderNavigation } from "../structure/RenderNavigation";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
export const useAuthInfo = () => useContext(AuthContext)

const AuthWrapper = () => {
    const [user, setUser] = useState({name: null, isAuthenticated: false});

    const login = (username, password) => {
        return new Promise((resolve, reject) => { 
            if(password === "password") {
                setUser({name: username, isAuthenticated: true})
                resolve("success");
            } else {
                setUser({name: null, isAuthenticated: false})
            }
        })
    }

    const logout = () => {
        setUser({...user, isAuthenticated: false})
    }

    return (
        <AuthContext.Provider value = {{user, login, logout}}>
            <>
                <Headers />
                <RenderNavigation />
                <Footer />
            </>
        </AuthContext.Provider>
    )
}

export default AuthWrapper;