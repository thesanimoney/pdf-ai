import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import {Toaster} from "@/components/ui/sonner";
import {ReactNode} from "react";
import {AuthProvider} from "@/components/authProvider";
import {auth} from "@/auth";
import ReactQueryProvider from "@/components/providers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "GL PDF extractor",
    description: "Created by Global Logic team.",
};

export default async function RootLayout({children,}: Readonly<{ children: ReactNode }>) {
    const session = await auth()

    return (
        <AuthProvider session={session}>
            <html lang="en">
                <body className={inter.className}>
                <Navbar/>
                <ReactQueryProvider>
                {children}
                      </ReactQueryProvider>
                <Toaster/>
                </body>
            </html>
        </AuthProvider>
    );
}
