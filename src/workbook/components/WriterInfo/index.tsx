import React from "react";

import { Writer } from "@workbook/types";

interface WriterInfoProps {
  writers: Writer[];
}

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
