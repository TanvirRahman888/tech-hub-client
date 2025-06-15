'use client'
// import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut =()=>{
       return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe= onAuthStateChanged(auth, (currentUser) => {
            console.log("currentUser" , currentUser);
            setUser(currentUser)
        });
        return ()=>{
            unSubscribe()
        }
    }
        , [])

    const authInfo = { user, createUser, loginUser , logOut}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;