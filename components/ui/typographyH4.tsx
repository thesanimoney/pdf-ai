import {ReactNode} from "react";

export function TypographyH4({children}: {children: ReactNode}) {
  return (
    <h4 className="scroll-m-20 text-xl text-zinc-700 font-semibold tracking-tight hover:text-orange-600 transition-all ease-in-out 300ms">
        {children}
    </h4>
  )
}
