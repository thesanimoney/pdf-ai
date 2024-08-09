import {auth} from "@/auth";
import {redirect} from "next/navigation";
import PdfRender from "@/components/pdfRender";
import {Card} from "@/components/ui/card";
import {getFileById} from "@/data/files";
import ChatWrapper from "@/components/chat/chatWrapper";

interface Props {
    params: {
        id: string
    }
}

async function Page({params: {id}}: Props) {
    const session = await auth()
    if (!session) return redirect('/auth/login')

    const {file} = await getFileById(id)
    if (!file) return redirect('/dashboard')

    return <>
        <div className={'grid grid-cols-7 gap-x-5'}>
            <Card className={'col-span-7 max-h-[100%] lg:col-span-3 shadow-sm rounded-lg '}>
                <PdfRender url={file?.url}/>
            </Card>
            <Card className={'col-span-7 lg:col-span-4 bg-zinc-50/50 shadow-sm rounded-lg'}>
                <ChatWrapper id={file?.id}/>
            </Card>
        </div>
    </>
}

export default Page;