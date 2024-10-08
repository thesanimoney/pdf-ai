import {PropsWithChildren, Suspense} from "react";
import LoadingSpinner from "@/app/(protected)/dashboard/loading";

function Layout({children}: PropsWithChildren) {
    return <>
            <main className={'mt-5'}>
                <Suspense fallback={<LoadingSpinner/>}>
                    {children}
                </Suspense>
            </main>
    </>
}

export default Layout;