import {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import {JWT} from "next-auth/jwt";
import jsonwebtoken from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";
import {AdapterUser} from "next-auth/adapters";

const prisma = new PrismaClient();

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const THIRTY_MINUTES = 30 * 60;

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            from: process.env.SMTP_FROM,
            async sendVerificationRequest({
                                              identifier: email,
                                              url,
                                              provider: { server, from },
                                          }) {
                if (process.env.NODE_ENV === "development") {
                    console.log(`Login link: ${url}`);
                }

                const { host } = new URL(url);
                const transport = nodemailer.createTransport(server);
                await transport.sendMail({
                    to: email,
                    from,
                    subject: `Sign in to ${host}`,
                    text: text({ url, host }),
                    html: html({ url, host, email }),
                });
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                token.userId = user.id;
                token.token = user.token;
                token.id = user.id;
                // Type assertion to handle 'emailVerified' property
                token.emailVerified = (user as AdapterUser).emailVerified;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            if (token?.userId) {
                session.user.id = token.userId;
                session.user.emailVerified = token.emailVerified as Date;
                session.user.email = token.email;
                session.token = jsonwebtoken.sign(token, process.env.NEXTAUTH_SECRET, { algorithm: 'HS256' });

            }
            return session;
        },
        async createUser(user: any) {
            const newUser = await prisma.user.create({
                data: user,
            });

            return newUser;
        },
        async signIn({ user, account}) {
            if (account.provider === 'email') {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email },
                });

                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            email: user.email,
                        },
                    });
                }

                if (user.email && !(user as AdapterUser).emailVerified) {
                    await prisma.user.update({
                        where: { email: user.email },
                        data: { emailVerified: new Date() },
                    });
                }

                return true;
            }
            return true;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: THIRTY_DAYS,
        updateAge: THIRTY_MINUTES,
    },
    secret: process.env.NEXTAUTH_SECRET,
}

function html({ url, host, email }: { url: string; host: string; email: string }) {
    const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
    const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;
    return `
    <body>
      <h1>Your magic link! 🪄</h1>
      <h3>Your email is ${escapedEmail}</h3>
      <p>
        <a href="${url}">Sign in to ${escapedHost}</a>
    </body>
  `;
}

function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`;
}