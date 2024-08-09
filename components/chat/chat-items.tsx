'use client'

import Message from "@/components/chat/message";
import {useLoadingStore, useStoreMessage} from "@/store";

interface Props {
    messages: {
        data:
            { createdAt: Date, text: string, isUserMessage: boolean }[]
    }
}

function ChatItems({messages}: Props) {
    const {isLoading} = useLoadingStore()
    const {message} =  useStoreMessage()

    return <>
        <div id='scrollDiv'
             className={'flex flex-col max-h-[calc(100vh-12rem)] mb-5 overflow-scroll justify-between space-y-6'}>
            {messages && messages.data.length > 1 &&
                messages?.data.sort((a, b) =>
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                    .map((item, index) =>
                        <Message key={index} isUserMessage={item?.isUserMessage} text={item?.text}/>)}
            {isLoading && <div className={'blinking h-24 px-5 py-2 w-full bg-orange-400/10 rounded-md mb-5 flex flex-col'}>
                <div className={'blinking rounded-full h-10 w-10 bg-orange-400/20 mb-3'}></div>
                <p className={'leading-7 text-zinc-300'}>{message}</p>
            </div>}
        </div>

    </>
}

export default ChatItems;