'use client'

import {useForm} from "react-hook-form";
import {messageSchema, MessageType} from "@/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {CornerDownLeft} from "lucide-react";
import sendMessage, {generateAnswer} from "@/actions/message";
import {toast} from "sonner";
import {useEffect, useTransition} from "react";
import {BeatLoader} from "react-spinners";
import {Input} from "@/components/ui/input";
import {useLoadingStore, useStoreMessage} from "@/store";

function MessageForm({id}: { id: string }) {
    const [isPending, startTransition] = useTransition()
    const {setIsLoading} = useLoadingStore()
    const {addMessage} = useStoreMessage()

    const form = useForm<MessageType>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            message: ''
        }
    })

    const handleScroll = () => {
        const element = document.getElementById('scrollDiv');
        element?.lastElementChild?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    };

    const onSubmit = async (data: MessageType) => {
        form.reset()
        addMessage(data.message)
        setIsLoading(true)
        setTimeout(() => handleScroll(), 100)


        startTransition(async () => {
            try {
                const res = await sendMessage(data.message, id);

                if (res?.error) {
                    toast.error(res.error)
                    return;
                }

                await generateAnswer(id, data.message)
                setTimeout(() => handleScroll(), 100)
                setIsLoading(false)

            } catch (error) {
                console.error('Error during onSubmit:', error);
                toast.error('An unexpected error occurred.');
            }
        })
    }

    useEffect(() => {
            handleScroll()
        },
        [])

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-center">
                <div className="flex-1">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Ask pdf assistant..."
                                        className="resize-none h-16"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}/>
                </div>
                <Button
                    onClick={() => console.log('click')}
                    disabled={!form.getValues('message') || isPending}
                    className={'absolute bg-orange-300 hover:bg-orange-400/80 right-8 text-orange-800/60'}
                    type="submit">
                    <input type={'submit'} hidden/>
                    {isPending ? <BeatLoader size={7} color={'white'}/> : <CornerDownLeft size={15}/>}
                </Button>
            </form>
        </Form>
    </>
}

export default MessageForm;