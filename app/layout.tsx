import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./navbar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

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
        <html lang="en">
            <Head>
                <script src="https://kit.fontawesome.com/1078a16cc9.js" crossOrigin="anonymous"></script>
            </Head>
            <body className={inter.className}>
                <NavBar></NavBar>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
