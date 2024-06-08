"use client";

import { EMAIL_PLACEHOLDER, SUBSCRIBE_ANNOUCE, SUBSCRIBE_CONFIRM, SUBSCRIBE_TITLE_FEW } from "@main/constants/main";
import { useSubscribeForm } from "@main/hooks/useSubscribeForm";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@shared/components/ui/form"

export default function SubscribeBottomBar() {
    const { form, onSubmit } = useSubscribeForm();

    return (
        <div className="max-w-[480px] w-full fixed bottom-0 left-0 right-0 flex items-center justify-center bg-background1 p-[16px]">
            <div className="bg-transparent w-full">
                <h3 className="text-[17px] h3-bold mb-4">{SUBSCRIBE_TITLE_FEW}</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[20px]">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder={EMAIL_PLACEHOLDER} {...field} className={`rounded-[10px] focus-visible:ring-transparent text-[16px] ${form.formState.errors.email ? 'border-error' : ''}`} />
                                    </FormControl>
                                    <FormMessage />
                                    <span className="text-[12px] font-semibold text-text-gray2 mt-[11px]">
                                        {SUBSCRIBE_ANNOUCE.SUBSCRIBE_CONSEQUENCE} <a className="text-[12px] font-semibold underline">{SUBSCRIBE_ANNOUCE.PRIVACY_COLLECTION_NOTICE}</a>과 <a className="text-[12px] font-semibold underline">{SUBSCRIBE_ANNOUCE.PROMOTIONAL_CONSENT_NOTICE}</a>에 {SUBSCRIBE_ANNOUCE.AGREEMENT_NOTICE}
                                    </span>
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row w-full space-x-[8px]">
                            <Button type="submit" className="w-full bg-main text-white rounded-none py-6">
                                {SUBSCRIBE_CONFIRM}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
