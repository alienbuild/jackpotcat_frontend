import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/authOptions";
import {Suspense} from "react";
import GuestActions from "@/components/headers/GuestActions";
import AuthActions from "@/components/headers/AuthActions";

const HeaderActions = async () => {

    const session = await getServerSession(authOptions)

    return (
        <div className={"absolute top-5 right-5"}>
            <Suspense fallback={'Loading...'}>
                {session && session.user ? <AuthActions/> : <GuestActions/>}
            </Suspense>
        </div>
    )
}

export default HeaderActions