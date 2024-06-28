import Link from "next/link";

import React, { Fragment } from "react";

import { WorkbookInfo } from "@workbook/types";

type WriterInfoProps = Pick<WorkbookInfo, "writers">;

export default function WriterInfo({ writers }: WriterInfoProps) {
  return (
    <div className="flex flex-row items-center space-x-[8px]">
      <div className="flex items-center">
        <span className="body1-medium text-text-gray2">작가</span>
      </div>
      {writers.map((writer, idx) => (
        <Fragment key={idx}>
          <Link href={writer.url} className="body1-medium text-text-gray1">
            {writer.name}
          </Link>
          {idx < writers.length - 1 && (
            <span className="body1-medium text-text-gray1"> · </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
