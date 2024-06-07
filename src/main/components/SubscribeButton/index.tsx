import { SubscribeButtonProps } from "@main/types";
import { Button } from "@shared/components/ui/button";


export default function SubscribeButton ({label, handleClick, variant, className}: SubscribeButtonProps) {
    return (
        <Button
            variant={variant}
            onClick={handleClick && handleClick}
            className={`${className} rounded-none`}
        >
            {label}
        </Button>
    )
}