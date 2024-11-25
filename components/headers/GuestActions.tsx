"use client"

import {useAuth} from "@/contexts/AuthContext";

const GuestActions = () => {

    const { toggleAuthModal } = useAuth();

    return(
        <div className={"flex gap-3"}>
            <button
                onClick={() => toggleAuthModal()}
                className="max-w-md mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="button auto px-2 h-8 bg-pink-500 cursor-pointer select-none active:translate-y-2 active:[box-shadow:0_0px_0_0_#ec4899,0_0px_0_0_#f472b6] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#ec4899,0_15px_0_0_#ec4899] rounded-full border-[1px] border-pink-400">
                <span
                    className="flex gap-2 items-center h-full font-slackey text-white text-xl text-shadow"
                >
                    Login
                </span>
                </div>
            </button>
            <button
                onClick={() => toggleAuthModal()}
                className="max-w-md mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div
                    className="button w-auto px-2 h-8 bg-yellow-500 cursor-pointer select-none active:translate-y-2 active:[box-shadow:0_0px_0_0_#ec4899,0_0px_0_0_#f472b6] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#b3aa00,0_15px_0_0_#b3aa00] rounded-full border-[1px] border-yellow-400"
                >
                <span
                    className="flex gap-2 items-center h-full font-slackey text-white text-xl text-shadow"
                >
                    Open an account
                </span>
                </div>
            </button>
        </div>
    )
}

export default GuestActions