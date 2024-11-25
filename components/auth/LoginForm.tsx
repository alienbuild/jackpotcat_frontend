"use client"

import {useState} from "react";
import {Button, Input, Spinner} from "@nextui-org/react";
import Link from "next/link";
import {signIn} from "next-auth/react";

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [clientLink, setClientLink] = useState('');
    const [loggingIn, setLoggingIn] = useState(false)

    const detectEmailClient = (domain: string | null) => {
        switch (domain){
            case 'gmail':
                setClientLink('https://mail.google.com/mail/u/0/#inbox')
                break
            case 'live':
                setClientLink('https://login.live.com/')
                break
            case 'proton':
                setClientLink('https://account.proton.me/login?product=mail&language=en')
                break
            case 'zoho':
                setClientLink('https://accounts.zoho.eu/')
                break
            case 'gmx':
                setClientLink('https://www.gmx.com/#.1730814-messagebar-login1-1')
                break
            case 'icloud':
                setClientLink('https://www.icloud.com/mail')
                break
            case 'ymail':
                setClientLink('https://login.yahoo.com/')
                break
            case 'mail2world':
                setClientLink('https://www.mail2world.com/app/')
                break
            default:
                return
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoggingIn(true)
        const extractDomainName = (email:string) => email.match(/@(.+?)\./)?.[1] || null;

        try {
            const status = await signIn('email', { email, redirect: false });

            if (status?.error) {
                // showErrorToast(status.error);
                setLoggingIn(false)
                return;
            }

            detectEmailClient(extractDomainName(email))
            setIsSuccessful(true)

        } catch {
            setLoggingIn(false)
        }
    }

    return(
        <>
            {isSuccessful ? <SuccessInfo email={email} clientLink={clientLink} /> : (
                <form onSubmit={handleSubmit}>
                    <div className="mt-3 text-center sm:mt-5">
                        <p className="text-base font-semibold leading-6 text-gray-900">Login / Register</p>
                        <p className="mt-3 mb-5 block text-center text-sm text-gray-600">Please enter your email address to continue</p>
                        <div className={"mt-5 overflow-hidden text-black"}>
                            <Input
                                label={"Email"}
                                name="email"
                                type="email"
                                autoComplete="off"
                                isRequired
                                value={email}
                                placeholder="e.g. john@doe.com"
                                labelPlacement={"outside"}
                                variant={"bordered"}
                                onChange={(e) => setEmail(e.target.value)}
                                description={"We operate a passwordless service for your own security and peace of mind, so you only need to enter your email address."}
                            />
                        </div>

                    </div>
                    <div className="mt-5 sm:mt-6">
                        <Button
                            type={"submit"}
                            fullWidth
                            className={`text-sm font-medium bg-blue-500 text-white disabled:bg-slate-50 disabled:text-slate-500 disabled:border-gray-200 disabled:border disabled:cursor-not-allowed`}
                            disabled={!email || loggingIn}
                        >
                            {loggingIn ? <><Spinner size={"sm"}/> Logging in...</> : 'Continue'}
                        </Button>
                    </div>
                </form>
            )}
        </>
    )
}

interface SuccessProps {
    email: string,
    clientLink: string,
}

const SuccessInfo = ({email, clientLink}: SuccessProps) => (
    <>
        <div>
            {/*<SecurityStopIcon classes={`w-16 mx-auto`}/>*/}
            <div className="mt-3 text-center sm:mt-5">
                Hold up! Authenticate
                <p className="mt-3 text-center text-sm text-gray-600">We have emailed your authentication link
                    to <strong>{email}</strong>.</p>
            </div>
        </div>
        <div className="mt-5 sm:mt-6">
            <Button
                fullWidth
                as={Link}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-medium bg-blue-500 text-white`}
                href={clientLink || "#"}
            >
                Open Email
            </Button>
        </div>
    </>
);

export default LoginForm