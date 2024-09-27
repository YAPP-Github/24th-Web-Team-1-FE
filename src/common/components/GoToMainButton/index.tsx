import { useRouter } from "next/navigation";

import { Button } from "@shared/components/ui/button";

import { GO_TO_MAIN } from "@common/constants/notFound";

export default function GoToMainButton () {
    const router = useRouter()
    return (
        <Button className="h-[56px] w-full rounded-none bg-main py-6 text-white" onClick={() => router.push('/')}>
            {GO_TO_MAIN}
        </Button>
    )
}