"use client"

import {SessionProvider} from "next-auth/react";
import {ReactNode} from "react";
import {AuthProvider} from "@/contexts/AuthContext";
import AppModals from "@/components/modals/AppModals";
import {NextUIProvider} from "@nextui-org/react";
import CookieAuth from "@/components/CookieAuth";

interface ProviderProps {
    children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {

    return(
        <NextUIProvider>
            <SessionProvider>
                <AuthProvider>
                    <AppModals />
                    {children}
                </AuthProvider>
            </SessionProvider>
            <CookieAuth />
        </NextUIProvider>
    )
}

export default Providers