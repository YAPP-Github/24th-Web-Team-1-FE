import React from "react";

import { WorkbookInfo } from "@workbook/types";

type WriterInfoProps = Pick<WorkbookInfo,'writers'>

export default function WriterInfo({ writers }: WriterInfoProps) {
  return (
    <div className="flex flex-row">
      {writers.map((writer, idx) => (
        <React.Fragment key={idx}>
          <span className="sub2-bold text-text-gray1">{writer.name}</span>
          {idx < writers.length - 1 && (
            <span className="sub2-bold text-text-gray1"> · </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
