import React from "react";

import { Writer } from "@workbook/types";

import ShareIcon from "public/assets/icon36/share_36.svg";
import Tag from "../Tag";

interface TitleSectionProps {
  category: string;
  title: string;
  editors: Writer[];
}

export default function TitleSection({
  category,
  title,
  editors,
}: TitleSectionProps) {
  return (
    <header className="flex flex-col gap-[12px]">
      <Tag title={category} />
      <div className="flex items-center">
        <h1 className="h1-bold text-[28px] text-black">{title}</h1>
        <div className="ml-auto">
          <ShareIcon />
        </div>
      </div>
      <section className="mt-[2px] flex items-center space-x-[8px]">
        <span className="sub2-bold text-text-gray2">작가</span>
        <div className="sub2-bold flex items-center text-text-gray1">
          {editors.map((editor, idx) => (
            <React.Fragment key={idx}>
              <span>{editor.name}</span>
              {idx < editors.length - 1 && <span> · </span>}
            </React.Fragment>
          ))}
        </div>
      </section>
    </header>
  );
}
