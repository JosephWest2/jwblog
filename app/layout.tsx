import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Joseph West Blog",
    description: "My Blog - Joseph West",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NavBar></NavBar>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
