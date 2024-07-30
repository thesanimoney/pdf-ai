'use client'

import CardWrapper from "@/components/cardWrapper";
import {useForm} from "react-hook-form";
import {authSchema, AuthType} from "@/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState, useTransition} from "react";
import login from "@/actions/login";
import {toast} from "sonner";
import {BeatLoader} from "react-spinners";

function LoginForm() {
    const [isPending, startTransition] = useTransition()

    const form = useForm<AuthType>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = (data: AuthType) => {
        startTransition(() => {
            login(data).then(res => {
               if (res?.success) toast.success(res?.success)
               if (res?.error) toast.error(res?.error)
            })
        })
    }

    return <>
        <CardWrapper lable={'Login into existing account.'} backButton={'Dont have account?'}
                     backButtonUrl={'/auth/register'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4 w-full'}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} placeholder="j.doe@globallogic.com" {...field} />
                                </FormControl>
                                <FormDescription>This is your email for authentication.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button disabled={isPending} size={'lg'} type={'submit'}>Sign in
                        {isPending && <BeatLoader size={7} color={'white'} className={'ml-2'}/>}</Button>
                </form>
            </Form>
        </CardWrapper>
    </>
}

export default LoginForm;