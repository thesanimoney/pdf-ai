import authConfig from "./auth.config";
import NextAuth from "next-auth";

import {apiAuthPrefix, authRoutes, protectedRoutes, publicRoutes} from "@/routes";

const {auth} = NextAuth(authConfig)

export default auth(req => {
    const {nextUrl} = req;

    const isAuthenticated = !!req.auth;
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

    if (isApiAuthRoute) return;

    if (isAuthRoute) {
        if (isAuthenticated) return Response.redirect(new URL('/dashboard', nextUrl))
        return;
    }

    if (!isAuthenticated && !isPublicRoute) return Response.redirect(new URL('/auth/login', nextUrl))

    return;
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}