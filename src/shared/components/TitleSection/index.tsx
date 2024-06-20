"use client";
import React, { ReactElement, useState } from "react";

import ShareIcon from "public/assets/icon/share.svg";
import Tag from "../../../common/components/Tag";
import ExternalControlOpenDialog from "@shared/components/ExternalControlOpenDialog";
import { LINK_SHARE_CONTENT } from "@common/constants/linkShareContent";
import { usePathname } from "next/navigation";
import { Button } from "@shared/components/ui/button";
import LinkShare from "../../../common/components/LinkShare";



interface TitleSectionProps {
  category: string;
  title: string;
  editorComponent: ReactElement;
}

export default function TitleSection({
  category,
  title,
  editorComponent,
}: TitleSectionProps) {

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const onClickControlOpenDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <header className="flex flex-col gap-[12px]">
        <Tag title={category} />
        <div className="space-between flex items-center">
          <h1 className="h1-bold text-[28px] text-black">{title}</h1>
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
