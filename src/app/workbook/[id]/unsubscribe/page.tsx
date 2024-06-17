"use client"

import UnsubscribeForm from "@workbook/components/UnsubscribeForm";
import UnsubscribeTitle from "@workbook/components/UnsubscribeTitle";

export default function SubscriptionCancelPage () {
    return (
        <div className="flex h-full flex-col space-y-10">
            <UnsubscribeTitle />
            <UnsubscribeForm />
        </div>
    )
}