"use client"

import {CookieConsent} from "react-cookie-consent";
import {usePathname} from "next/navigation";
import Link from "next/link";

const CookieAuth = () => {

    const pathname = usePathname();

    if (pathname === '/legal/privacy-policy') return
    if (pathname === '/legal/terms-of-service') return

    return(
        <>
            <CookieConsent
                disableStyles={true}
                enableDeclineButton={true}
                overlay={true}
                location={"bottom"}
                containerClasses="bg-white shadow max-w-lg mx-auto rounded-lg relative py-10 text-black"
                contentClasses="text-capitalize"
                overlayClasses="bg-black bg-opacity-70 h-full w-full fixed z-[100] flex justify-center items-center fixed top-0 left-0 z-[99999] backdrop-filter backdrop-blur-md"
                buttonWrapperClasses={"flex justify-center items-center gap-5 py-5 mt-5"}
                buttonClasses="rounded-md bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                declineButtonClasses={"text-gray-400 hover:text-gray-700 transition-colors duration-250"}
                buttonText={"Accept"}
                declineButtonText={"Decline"}
                ariaAcceptLabel={"Accept Cookies"}
                ariaDeclineLabel={"Decline Cookies"}
            >
                <header className={`py-5`}>
                    <span className={`block text-4xl font-bold text-center font-slackey`}>We use cookies!</span>
                    <span className={"block text-xl text-slate-400 font-slackey text-center"}>(yummy)</span>
                </header>
                <div className="px-10 text-center">
                <p>
                        We use cookies to personalise our website and offering to your interests and for measurement and analytics purposes. By using our website and our products, you agree to our use of cookies.
                        <Link href={`/legal/privacy-policy`} className={`font-medium text-blue-500`}>Learn more</Link>
                    </p>
                </div>
                <img
                    src={`/images/cookie-jack.png`}
                    alt={"Jack cookies"}
                    className={"w-[200px] absolute -right-14 -bottom-10"}
                />
                <img
                    src={`/images/cookie-crumbs.png`}
                    alt="Jacks cookie crumbs"
                    className={`left-1/2 absolute -bottom-5 max-w-[180px]`} style={{marginLeft: "-100px"}}
                />
            </CookieConsent>
        </>
    )
}

export default CookieAuth