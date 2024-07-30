
interface PdfRenderProps {
    id: string
}

function PdfRender({id}:PdfRenderProps) {
    return <>
        <div className={'w-full bg-white rounded-md shadow-sm flex flex-col items-center'}>
            <div className={'flex w-full border-b h-14 border-zinc-200 items-center justify-between px-2'}>
                <div className={'flex gap-1.5 items-center'}>
                    {id}
                </div>
            </div>
        </div>
    </>
}

export default PdfRender;