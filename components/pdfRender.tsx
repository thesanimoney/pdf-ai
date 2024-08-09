'use client'

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {pdfjs, Document, Page} from 'react-pdf';
import LoadingSpinner from "@/app/(protected)/dashboard/loading";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {ChevronDown, ChevronUp, Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {cn} from "@/lib/utils";
import {useResizeDetector} from "react-resize-detector";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

interface PdfRenderProps {
    url: string
}

function PdfRender({url}: PdfRenderProps) {
    const [numPages, setNumPages] = useState<number>()
    const [currPage, setCurrPage] = useState<number>(1)
    const [scale, setScale] = useState(1)

    const CustomPageValidator = z.object({
        page: z.string().refine((num) => Number(num) > 0 && Number(num) <= numPages!),
    })

    type TCustomPageValidator = z.infer<
        typeof CustomPageValidator
    >

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<TCustomPageValidator>({
        resolver: zodResolver(CustomPageValidator),
        defaultValues: {
            page: '1',
        }
    })

    const handlePageSubmit = ({page}: TCustomPageValidator) => {
        setCurrPage(Number(page))
        setValue('page', String(page))
    }

    const {width, ref} = useResizeDetector()

    return <>
        <div className={'bg-white max-h-[92vh] rounded-xl shadow-sm flex flex-col items-center'}>
            <div className={'flex w-full border-b h-14 border-zinc-200 items-center justify-between px-2'}>
                <div className={'flex gap-1.5 items-center'}>
                    <Button
                        disabled={numPages! <= 1} onClick={() => {
                            setCurrPage((prev) => prev - 1 > 1 ? prev - 1 : 1)
                            setValue('page', String(currPage - 1))
                        }}
                        variant='ghost'
                        aria-label='previous page'>
                        <ChevronDown className='h-4 w-4'/>
                    </Button>
                    <div className='flex items-center gap-1.5'>
                        <Input{...register('page')}
                            className={cn('w-12 h-8', errors.page && 'border-red-300')}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSubmit(handlePageSubmit)()
                            }}/>
                        <p className='text-zinc-700 text-sm space-x-1'>
                            <span>/</span>
                            <span>{numPages ?? 'x'}</span>
                        </p>
                    </div>
                    <Button
                        disabled={numPages === undefined || currPage === numPages}
                        onClick={() => {setCurrPage((prev) =>
                                prev + 1 > numPages! ? numPages! : prev + 1)
                            setValue('page', String(currPage + 1))}}
                        variant='ghost'
                        aria-label='next page'>
                        <ChevronUp className='h-4 w-4'/>
                    </Button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className={'text-zinc-700 gap-x-2'} variant='ghost'>
                            <Search size={17}/>
                            {scale * 100}%
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => setScale(1)}>100%</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setScale(1.25)}>125%</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setScale(1.5)}>150%</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setScale(1.75)}>175%</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setScale(2)}>200%</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div ref={ref} className={'w-full overflow-scroll p-0.5'}>
                <Document
                    onLoadSuccess={({numPages}) => setNumPages(numPages)}
                    onLoadError={(error) => toast.error(error.message)}
                    loading={<LoadingSpinner/>} file={url}>
                    <Page scale={scale} width={width ? width : 1} pageNumber={currPage} pageIndex={currPage - 1}/>
                </Document>
            </div>
        </div>
    </>
}

export default PdfRender;