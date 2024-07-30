'use client'

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {FileData} from "@prisma/client";
import {Clock, TrashIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useTransition} from "react";
import {deletePDFById} from "@/actions/pdf";
import {toast} from "sonner";
import Link from "next/link";

interface Props {
    pdf: FileData
}

function PdfCard({pdf}: Props) {
    const [isPending, startTransition] = useTransition()

    const onDelete = (id: string) => {
        startTransition(() => {
            deletePDFById(id).then(res => {
                if (res?.error) toast.error(res?.error);
                if (res?.success) toast.success(res?.success);
            });
        });
    };

    return <>
        <Card className={'shadow-sm hover:cursor-pointer hover:shadow-md transition-all ease-in-out 300ms'}>
          <Link href={`/dashboard/${pdf?.id}`}>
                <CardHeader>
                <CardTitle className={'text-zinc-700'}>
                   <span className={'flex items-center gap-x-2'}>
                       <div className={'h-10 w-10 bg-gradient-to-r from-orange-300 to-rose-300 rounded-full'}/>
                       <span className={'truncate max-w-[200px]'}>{pdf?.name}</span>
                   </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Link>
            <CardFooter className={'flex flex-row justify-between'}>
                <div className={'flex items-center gap-x-2 text-zinc-500'}>
                    <Clock size={20}/>
                    <p className={'text-sm'}>{pdf?.createdAt.toLocaleDateString('en-GB')}</p>
                </div>
                <div>
                    <Button onClick={() => onDelete(pdf?.id)} disabled={isPending} className={'group'} variant={'ghost'}>
                        <TrashIcon className={'group-hover:text-red-400 transition-all ease 250ms'} size={20}/>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    </>
}

export default PdfCard;