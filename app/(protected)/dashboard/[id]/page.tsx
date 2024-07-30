import {auth} from "@/auth";
import {redirect} from "next/navigation";
import PdfRender from "@/components/pdfRender";
import {Card} from "@/components/ui/card";

interface Props {
    params: {
        id: string
    }
}

async function Page({params: {id}}: Props) {
    const session = await auth()
    if (!session) return redirect('/auth/login')

    return <>
        <div className={'grid grid-cols-7 gap-x-5 mx-auto h-[calc(100vh-7rem)]'}>
            <Card className={'col-span-3 shadow-xs overflow-hidden'}>
                <PdfRender id={id}/>
            </Card>
            <Card className={'col-span-4 bg-zinc-50 shadow-sm'}>
            </Card>
        </div>
    </>
}

export default Page;