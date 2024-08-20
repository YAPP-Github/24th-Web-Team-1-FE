import { WorkbookClientInfo } from "@workbook/types";

import WriterLink from "../WriterLink";

type WriterInfoProps = Pick<WorkbookClientInfo, "writers">;

export default function WriterInfo({ writers }: WriterInfoProps) {
  return (
    <div className="flex flex-row items-center space-x-[8px]">
      <div className="flex items-center">
        <span className="body1-medium text-text-gray2">작가</span>
      </div>
      {writers.map((writer, idx) => (
        <WriterLink
          key={idx}
          name={writer.name}
          url={writer.url}
          isLast={idx === writers.length - 1}
        />
      ))}
    </div>
  );
}
