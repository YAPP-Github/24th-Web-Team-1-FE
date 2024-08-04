import { Button } from "@shared/components/ui/button"
import { cn } from "@shared/utils/cn"

interface WorkbookButtonItemProps {
    title: string
    handleClick: () => void
}

export default function WorkbookButtonItem ({ title, handleClick }: WorkbookButtonItemProps) {
    return (
        <Button onClick={handleClick} className={cn(
            "w-full h-14 px-[98px] pt-[18px] pb-[17px] bg-black justify-center items-center rounded-none",
            "text-white text-sm font-medium"
        )}>
            {title}
        </Button>
    )
}