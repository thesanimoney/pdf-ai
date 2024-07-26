import {Badge} from "@/components/ui/badge";
import TypographyP from "@/components/ui/typographyP";
import {TypographyH4} from "@/components/ui/typographyH4";
import {Card} from "@/components/ui/card";

interface Props {
    step: string
    text: string
    title: string
}

function Step({step, text, title}: Props) {
    return <>
        <div className={'p-2 space-y-1 flex flex-col items-start border-t-2 border-orange-500/30'}>
            <p className={'text-orange-500 font-medium leading-7'}>{step}</p>
            <TypographyH4>{title}</TypographyH4>
               <div className={'text-sm'}>
                    <TypographyP>{text}</TypographyP>
               </div>
        </div>
    </>
}

export default Step;