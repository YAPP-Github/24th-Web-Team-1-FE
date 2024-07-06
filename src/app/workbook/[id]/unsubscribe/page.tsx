"use client"

import UnsubscribeForm from "@subscription/components/UnsubscribeForm";
import UnsubscribeTitle from "@subscription/components/UnsubscribeTitle";

export default function SubscriptionCancelPage () {
    return (
        <div className="flex h-full flex-col space-y-10">
            <UnsubscribeTitle />
            <UnsubscribeForm />
        </div>
    )
}