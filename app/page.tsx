'use server'

import {Badge} from "@/components/ui/badge";
import HeroText from "@/components/heroText";
import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import TypographyH1 from "@/components/ui/typographyh1";
import TypographyP from "@/components/ui/typographyP";
import Step from "@/components/step";

async function Page() {

    return <>
        <main className={'container flex justify-center items-center mt-10 mb-10 flex-col space-y-20'}>
            <section className={'max-w-2xl relative text-center space-y-6'}>
                <Badge className={'py-2 px-3 shadow-md rounded-xl'}>GL PDF extractor is now available!</Badge>
                <HeroText/>
                <Button size={'lg'} asChild>
                    <Link href={'/dashboard'}>
                        Start Now!
                        <ArrowRightIcon className={'ml-2 h-4 w-4'}/>
                    </Link>
                </Button>
                <div
                    className={'absolute top-[80%] rotate-6 -z-10 blur-3xl rounded-3xl right-[40%] md:h-[600px] h-[300px] w-[100%] bg-gradient-to-r from-orange-300/30 to-rose-300/30'}></div>
            </section>
            <section>
                <div
                    className={'shadow-sm rounded-2xl border-1 ring-inset ring-zinc-900/10 bg-orange-500/20 p-3 max-w-6xl overflow-hidden'}>
                    <Image src={'/chat-zone.png'}
                           className={'rounded-xl ring-inset ring-zinc-600/10 p-2 bg-white shadow-md'} quality={100}
                           alt={'product preview'} width={1364} height={866}/>
                </div>
            </section>
            <section className={'space-y-6'}>
                <TypographyH1>
                    Start chatting in a minutes
                </TypographyH1>
                <TypographyP>
                    Chatting to your PDF knowing that your data is on your side!
                </TypographyP>
                <div className={'grid grid-cols-3 gap-x-10'}>
                    <div className={'col-span-1'}>
                        <Step step={'step 1'}
                              text={'Login via email @globallogic or @wcgclinical to access pdf extractor.'}
                              title={'Login via email.'}/>
                    </div>
                    <div className={'col-span-1'}>
                        <Step step={'step 2'}
                              text={'Upload pdf or drag and drop, to work with.'}
                              title={'Choose PDF.'}/>
                    </div>
                    <div className={'col-span-1'}>
                        <Step step={'step 3'}
                              text={'Write prompts to extract the most relevant parts of data.'}
                              title={'Start working.'}/>
                    </div>
                </div>
            </section>
            <section className={'relative'}>
                <div
                    className={'shadow-sm rounded-2xl border-1 ring-inset ring-zinc-900/10 bg-orange-500/20 p-3 max-w-6xl overflow-hidden'}>
                    <Image src={'/uploadPage.png'}
                           className={'rounded-xl ring-inset ring-zinc-600/10 p-2 bg-white shadow-md'} quality={100}
                           alt={'product preview'} width={1364} height={866}/>
                </div>
                <div
                    className={'absolute top-[20%] rotate-6 -z-10 blur-3xl rounded-3xl left-[20%] md:h-[600px] h-[300px] w-[100%] bg-gradient-to-r from-orange-300/30 to-rose-300/30'}></div>
            </section>
        </main>
    </>
}

export default Page;