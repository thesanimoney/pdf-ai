'use client'

import {Card, CardContent} from "@/components/ui/card";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {Clipboard, ClipboardCheck} from "lucide-react";
import {useState} from "react";
import {toast} from "sonner";
import formatText from "@/components/chat/textWrapper";

interface MessageProps {
    text: string;
    isUserMessage: boolean
}

function Message({text, isUserMessage}: MessageProps) {
    const session = useSession();
    const fallbackText = session.data?.user?.email?.slice(0, 2)
    const [copied, setCopied] = useState(false)

    const onCopy = async () => {
       await navigator.clipboard.writeText(text);
       setCopied(true)
        toast.success("Copied to clipboard");
    }

    return <>
        <Card className={`shadow-sm rounded-lg opacity-100 ${isUserMessage ? 'bg-white/30' : 'bg-orange-500/10'} py-2`}>
            <CardContent className={'flex flex-col space-y-4'}>
                <div className={'flex justify-between items-center'}>
                    <Avatar>
                        <AvatarFallback className={isUserMessage ? "bg-orange-200" : 'bg-gradient-to-r from-rose-400/60 to-orange-300/60'}>
                            {isUserMessage ? fallbackText || 'OS' : 'AI'}
                        </AvatarFallback>
                    </Avatar>
                    <Button onClick={onCopy} variant={'ghost'}>
                        {copied ? <ClipboardCheck color={'orange'} size={18} className={'mr-2 text-zinc-500'}/>
                            : <Clipboard className={'text-zinc-500'} size={18}/>}
                        {copied && 'Copied!'}
                    </Button>
                </div>
                <div className={'leading-7 text-zinc-700'} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: formatText(text) }}/>
            </CardContent>
        </Card>
    </>
}

export default Message;