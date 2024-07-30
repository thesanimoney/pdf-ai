'use client'

import {TypographyH4} from "@/components/ui/typographyH4";
import {Ghost} from "lucide-react";
import TypographyP from "@/components/ui/typographyP";
import {toast} from "sonner";

interface Props {
    error?: string
}

function Empty({error}:Props) {
    if (error) toast.error(error)

    return <>
        <div className={'flex flex-col justify-center space-y-2 items-center'}>
            <Ghost color={'darkOrange'} size={30}/>
            <TypographyH4>Pretty empty here.</TypographyH4>
            <TypographyP>Let&apos;s upload your first PDF.</TypographyP>
        </div>
    </>
}

export default Empty;