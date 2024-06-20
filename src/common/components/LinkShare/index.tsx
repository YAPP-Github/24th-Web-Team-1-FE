import { COPY_CLIP_URL } from "@common/constants/linkShareContent";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { useToast } from "@shared/components/ui/use-toast";
import { cn } from "@shared/utils/cn";
import LinkShareIcon from "public/assets/icon/link.svg";
import React, { HTMLAttributes } from "react";

interface LinkShareContentProps extends HTMLAttributes<HTMLDivElement> {
  href: string;
}
function LinkShareContent({ href }: LinkShareContentProps) {
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
    <section className="relative">
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
}

interface LinkSharedTitleProps extends HTMLAttributes<HTMLSpanElement> {}
function LinkSharedTitle({ title }: LinkSharedTitleProps) {
  return <span className="h3-bold">{title}</span>;
}

interface LinkSharedDescriptionProps extends HTMLAttributes<HTMLSpanElement> {}
function LinkSharedDescription({ content }: LinkSharedDescriptionProps) {
  return <span className="body3-medium pt-[10px]">{content}</span>;
}

const LinkShare = {
  Content: LinkShareContent,
  Title: LinkSharedTitle,
  Description: LinkSharedDescription,
};

export default LinkShare;
