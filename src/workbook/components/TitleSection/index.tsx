import { Writer } from "@workbook/types";

import ShareIcon from "public/assets/icon36/share_36.svg";
import React from "react";

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
    <header className="flex flex-col px-[20px]">
      <div></div>
      <div className="flex flex-row">
        <div>
          <h1 className="h1-bold text-[28px] text-black">{title}</h1>
        </div>
        <div className="ml-auto">
          <ShareIcon />
        </div>
      </div>
      <div className="mt-[16px] flex flex-row space-x-[8px]">
        <div>
          <span className="sub2-bold text-text-gray2">작가</span>
        </div>
        <div className="flex flex-row">
          {editors.map((editor, idx) => (
            <React.Fragment key={idx}>
              <span className="sub2-bold text-text-gray1">{editor.name}</span>
              {idx < editors.length - 1 && (
                <span className="sub2-bold text-text-gray1"> · </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </header>
  );
}
