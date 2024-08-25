import { XIcon } from "lucide-react";

interface CancelButtonProps {
  handleToggle: () => void;
}

export default function CancelButton({ handleToggle }: CancelButtonProps) {
  return (
    <div className="">
        <XIcon data-testid="x-menu" width={36} height={36} className="mr-[23px]" onClick={handleToggle} />
    </div>
  )
}
