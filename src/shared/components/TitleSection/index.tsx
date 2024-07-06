"use client";
import { usePathname } from "next/navigation";

import React, { HTMLAttributes, ReactElement, useState } from "react";

import ExternalControlOpenDialog from "@shared/components/ExternalControlOpenDialog";
import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/utils/cn";

import LinkShare from "../../../common/components/LinkShare";
import TagList from "@common/components/TagList";
import { LINK_SHARE_CONTENT } from "@common/constants/linkShareContent";
import ShareIcon from "public/assets/icon/share.svg";

interface TitleSectionProps extends HTMLAttributes<HTMLDivElement> {
  tagTexts: string[];
  title: string;
  editorComponent: ReactElement;
}

export default function TitleSection({
  tagTexts,
  title,
  editorComponent,
  className,
  ...props
}: TitleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const onClickControlOpenDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <header className={cn("flex flex-col gap-[12px]", className)}>
        <TagList tagTexts={tagTexts} />
        <div className="space-between flex items-center">
          <h2 className="h2-bold text-[28px] text-black">{title}</h2>
          <Button
            className="bg-transprent hover:bg-transprent"
            onClick={onClickControlOpenDialog}
          >
            <ShareIcon width={16} height={22} />
          </Button>
        </div>
        <section className="mt-[2px]">{editorComponent}</section>
      </header>
      <ExternalControlOpenDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={
          <LinkShare.Title title={LINK_SHARE_CONTENT.ARTICLE_INFO.TITLE} />
        }
        description={
          <LinkShare.Description
            content={LINK_SHARE_CONTENT.ARTICLE_INFO.DESCRIPTION}
          />
        }
        content={
          <LinkShare.Content
            href={`${process.env.NEXT_PUBLIC_FEW_WEB}${pathname}`}
          />
        }
      />
    </>
  );
}
