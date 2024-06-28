import { NETWORK_ERROR_MESSAGE } from "@shared/constants/networkError";

import ExternalControlOpenDialog from "../ExternalControlOpenDialog";
import { Button } from "../ui/button";

interface NetworkErrorProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NetworkError ({ isOpen, setIsOpen }: NetworkErrorProps) {
    const titleElement = <div>{NETWORK_ERROR_MESSAGE.CONNECTION_FAIL} <br /> {NETWORK_ERROR_MESSAGE.TRY_AGAIN}</div>
    const contentElement = <Button onClick={() => location.reload()} className="w-full bg-black text-white" variant={"default"}>다시 시도하기</Button>

    return (
        <ExternalControlOpenDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={titleElement}
            content={contentElement}
        />
    )

}