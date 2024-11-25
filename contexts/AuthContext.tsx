"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { useSession } from "next-auth/react";

interface AuthContextType {
    isAuthenticated: boolean;
    toggleAuthModal: () => void;
    authModalIsOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { data: session, status } = useSession();

    const isAuthenticated = status === 'authenticated'; // Use 'authenticated' (not 'Authenticated')

    const [authModalIsOpen, setAuthModalIsOpen] = useState(false);

    const toggleAuthModal = () => setAuthModalIsOpen(!authModalIsOpen);

    return (
        <AuthContext.Provider value={{ isAuthenticated, toggleAuthModal, authModalIsOpen }}>
            {children}
        </AuthContext.Provider>
    );
};
