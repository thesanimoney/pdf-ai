'use client'

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import LogoutButton from "@/components/logoutButton";
import {ExitIcon} from "@radix-ui/react-icons";
import {Mail} from "lucide-react";

interface Props {
    email: string | undefined | null
}

function UserButton({email}: Props) {
    const fallback = email?.slice(0, 2)

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarFallback className={'bg-orange-200'}>{fallback || 'OS'}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'w-[200px] bg-white p-2'} align={"end"}>
                <DropdownMenuItem className={'cursor-pointer'}>
                     <span className={'flex flex-row justify-between items-center'}>
                         <Mail size={15} className={'mr-2'}/>
                         <p className={'truncate max-w-[150px]'}>{email}</p>
                     </span>
                </DropdownMenuItem>
                <LogoutButton>
                    <DropdownMenuItem className={'cursor-pointer'}>
                        <ExitIcon className={'mr-2 w-4 h-4'}/>Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}

export default UserButton;