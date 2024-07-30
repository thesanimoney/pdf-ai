import {FileIcon} from "lucide-react";
import TypographyP from "@/components/ui/typographyP";

interface Props {
    name: string
}

function UploadBadge({name}: Props) {
    return <>
        <div className={'flex items-center bg-white border-zinc-200 gap-x-2 px-2 border rounded-sm'}>
            <div className={'border-r p-2 text-zinc-700'}>
                <FileIcon size={15}/>
            </div>
            <p className={'text-xs'}>{name}</p>
        </div>
    </>
}

export default UploadBadge;