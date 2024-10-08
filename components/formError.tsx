import {CircleAlert} from "lucide-react";

interface FormErrorProps {
    message?: string
}

function FormError({message}:FormErrorProps) {
    if (!message) return null

    return <>
<div className={'bg-destructive/15 p-3 rounded-md flex items-center text-sm text-destructive gap-x-2'}>
    <CircleAlert/>
    <p>{message}</p>
</div>
    </>
}

export default FormError;