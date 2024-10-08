import {TypographyH4} from "@/components/ui/typographyH4";
import {Button} from "@/components/ui/button";
import {EnterIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {auth} from "@/auth";
import UserButton from "@/components/userButton";

async function Navbar() {
    const session = await auth()

    return <>
        <nav className={'sticky shadow-sm bg-white/75 z-30 top-0 backdrop-blur transition-all'}>
            <div className={'container py-2 px-5 flex justify-between items-center'}>
                <Link href={'/'}>
                     <TypographyH4>
                         <span className={'text-orange-600'}>GL</span> PDF extractor
                     </TypographyH4>
                </Link>
               <div className={'flex justify-between items-center gap-x-2'}>
                   <ul>
                       <li>
                           <Button asChild variant={'ghost'}>
                               <Link href={'/dashboard'}>Dashboard</Link>
                           </Button>
                       </li>
                   </ul>
                   {!session ? <Button variant={'ghost'} asChild>
                    <Link href={'/auth/login'}>
                        Login
                        <EnterIcon className={'ml-2 h-4 w-4'}/>
                    </Link>
                </Button> : <UserButton email={session?.user?.email}/>}
               </div>
            </div>
        </nav>
    </>
}

export default Navbar;