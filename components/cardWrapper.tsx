import {ReactNode} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface Props {
    lable: string
    children: ReactNode
    backButton: string,
    backButtonUrl: string
}

function CardWrapper({lable, backButtonUrl, backButton, children}: Props) {
    return <>
        <Card className={'space-y-2 flex flex-col w-[350px]'}>
            <CardHeader>
                <CardTitle>
                    {lable}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <Button asChild variant={'ghost'}>
                    <Link href={backButtonUrl}>{backButton}</Link>
                </Button>
            </CardFooter>
        </Card>
    </>
}

export default CardWrapper;