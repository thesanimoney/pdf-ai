import {ReactNode} from "react";

function TypographyP({children}: {children: ReactNode}) {
    return <>
        <p className="leading-5 text-zinc-600 [&:not(:first-child)]:mt-6">
             {children}
        </p>
    </>
}

export default TypographyP;