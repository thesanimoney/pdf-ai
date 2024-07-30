import {PropsWithChildren} from "react";

function SessionLayout({children}: PropsWithChildren) {
    return <>
        <main className={'p-3'}>{children}</main>
    </>
}

export default SessionLayout;