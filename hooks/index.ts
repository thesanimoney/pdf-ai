'use client'

import {useSession} from "next-auth/react";

export const useCurrentUser = () => {
        const session = useSession()
        return session.data?.user
}

export const handleScroll = () => {
        const element = document.getElementById('scrollDiv');
        element?.lastElementChild?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    };