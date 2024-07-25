import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { useToast } from "@shared/components/ui/use-toast";
import { COPY_CLIP_URL } from "@shared/constants/linkShareContent";
import { cn } from "@shared/utils/cn";
import LinkShareIcon from "public/assets/icon/link.svg";
import React, { HTMLAttributes } from "react";

interface LinkShareContentProps {
  href: string;
}
const LinkShareContent = React.forwardRef<
  HTMLDivElement,
  LinkShareContentProps
>(({ href, ...props }, ref) => {
  const { toast } = useToast();

  const onClickLinkCopy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      toast({ title: COPY_CLIP_URL });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section className="relative" ref={ref} {...props}>
      <Input
        className="body3-medium h-[48px] bg-text-gray3 !opacity-100"
        value={href}
        disabled
        type="text"
      />
      <Button
        className={cn(
          "absolute right-0 top-0 h-[48px] rounded-none rounded-br-md rounded-tr-md",
          "flex items-center bg-text-black p-[12px] focus:!border-none focus:!ring-transparent",
        )}
        type="button"
        onClick={onClickLinkCopy}
      >
        <LinkShareIcon fill="#ffffff" width={22} height={18} />
      </Button>
    </section>
  );
});
LinkShareContent.displayName = "LinkShareContent";

const LinkSharedTitle = React.forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(({ title, ...props }, ref) => {
  return <span className="h3-bold">{title}</span>;
});
LinkSharedTitle.displayName = "LinkSharedTitle";

const LinkSharedDescription = React.forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(({ content, ...props }, ref) => {
  return <span className="body3-medium">{content}</span>;
});
LinkSharedDescription.displayName = "LinkSharedDescription";

const LinkShare = {
  Content: LinkShareContent,
  Title: LinkSharedTitle,
  Description: LinkSharedDescription,
};

export default LinkShare;
