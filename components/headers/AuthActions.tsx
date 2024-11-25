"use client"

import { signOut } from "next-auth/react";

const AuthActions = () => {

    /**
     * Logs out the current user by calling the `signOut` function and then redirecting to the homepage.
     *
     * This function uses an asynchronous arrow function to perform the logout operation.
     * It calls the `signOut` method, a promise-based function, with `{ redirect: false }` to prevent
     * automatic redirection after sign-out. After signing out, it manually sets the `window.location.href`
     * to the root URL ("/") to navigate the user back to the homepage.
     *
     * @returns {Promise<void>} A promise that resolves once the logout process, including redirection, is complete.
     */
    const logout = async () => {
        await signOut({
            redirect: false,
        });
        window.location.href = "/";
    }

    return (
        <button
            className="max-w-md mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={logout}
        >
            <div
                className="button auto px-2 h-8 bg-pink-500 cursor-pointer select-none active:translate-y-2 active:[box-shadow:0_0px_0_0_#ec4899,0_0px_0_0_#f472b6] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#ec4899,0_15px_0_0_#ec4899] rounded-full border-[1px] border-pink-400">
        <span className="flex gap-2 items-center h-full font-slackey text-white text-xl text-shadow">
            Logout
        </span>
            </div>
        </button>
    )
}

export default AuthActions