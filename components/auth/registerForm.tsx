'use client'

import CardWrapper from "@/components/cardWrapper";
import {useForm} from "react-hook-form";
import {authSchema, AuthType} from "@/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import register from "@/actions/register";
import {toast} from "sonner";
import {useTransition} from "react";
import {BeatLoader} from "react-spinners";

function RegisterForm() {
    const [isPending, startTransition] = useTransition()

    const form = useForm<AuthType>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = (data: AuthType) => {
        startTransition(() => {
            register(data).then(res => {
            if (res.success) toast.success(res.success)
            if (res.error) toast.error(res.error)
        }).catch(err => toast.error(err.message))
        })
    }

    return <>
        <CardWrapper lable={'Create new account.'} backButton={'Have account?'}
                     backButtonUrl={'/auth/login'}>
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
                                <FormDescription>This is your email for account creation.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button disabled={isPending} size={'lg'} type={'submit'}>Sign up {isPending &&
                        <BeatLoader size={'7'} color={'white'} className={'ml-2'}/>}</Button>
                </form>
            </Form>
        </CardWrapper>
    </>
}

export default RegisterForm;