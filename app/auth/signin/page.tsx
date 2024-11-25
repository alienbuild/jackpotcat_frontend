"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result?.error) {
            alert("Authentication failed!");
        } else {
            alert("Logged in!");
        }
    };

    return (
        <div>
            <h3>Sign In</h3>
            <form onSubmit={handleSignIn}>
                <Input
                    isClearable
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    isClearable
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Sign In</Button>
            </form>
        </div>
    );
};

export default SignIn;
