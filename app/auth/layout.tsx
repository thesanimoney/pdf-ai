import {ReactNode} from "react";

function Layout({children}: {children: ReactNode}) {
    return <>
        <main className={'container w-full h-full flex justify-center items-center flex-col'}>
            {children}
        </main>
    </>
}

export default Layout;