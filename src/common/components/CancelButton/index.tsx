import { XIcon } from "lucide-react";
import { HTMLAttributes } from "react";

interface CancelButtonProps extends HTMLAttributes<HTMLDivElement> {
  handleToggle: () => void;
}

export default function CancelButton({ handleToggle, ...props }: CancelButtonProps) {
  const { className } = props
  
  return (
    <div className={className}>
        <XIcon data-testid="x-menu" width={36} height={36} className="mr-[23px]" onClick={handleToggle} />
    </div>
  )
}
