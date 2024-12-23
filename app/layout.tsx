import type { Metadata } from "next";
import "@/styles/jackpotcat.scss";
import PrimaryHeader from "@/components/headers/PrimaryHeader";
import Providers from "@/contexts/Providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"bg-blue-500 text-white"}>
      <body>
          <Providers>
              <PrimaryHeader />
              {children}
          </Providers>
      </body>
    </html>
  );
}
