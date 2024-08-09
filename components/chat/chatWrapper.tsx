import MessageForm from "@/components/chat/messageForm";
import getMessagesByFileId from "@/data/messages";
import ChatItems from "@/components/chat/chat-items";

async function ChatWrapper({id}: { id: string }) {
    const messages = await getMessagesByFileId(id)

    return <>
        <div className={'flex h-full flex-col justify-between relative p-5'}>
            <ChatItems messages={messages}/>
            <div className={'w-full'}>
                <MessageForm id={id}/>
            </div>
        </div>
    </>
}

export default ChatWrapper;