import React, { ReactElement } from "react";

import Tag from "@common/components/Tag";
import ShareIcon from "public/assets/icon/share.svg";

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
  return (
    <header className="flex flex-col gap-[12px]">
      <Tag title={category} />
      <div className="flex items-center">
        <h1 className="h1-bold text-[28px] text-black">{title}</h1>
        <div className="ml-auto">
          <ShareIcon width={16} height={22} />
        </div>
      </div>
      <section className="mt-[2px]">{editorComponent}</section>
    </header>
  );
}
