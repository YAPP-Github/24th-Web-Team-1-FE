import { Writer } from "@workbook/types";
import React from "react";
import NextIcon from "public/assets/icon/next.svg";
import Link from "next/link";

interface WriterInfoProps extends Writer {}
export default function WriterInfo({ name, url }: WriterInfoProps) {
  return (
    <article className="flex items-center space-x-[8px]">
      <span className="sub2-bold text-text-gray2">작가</span>
      <span className="sub2-bold text-text-gray1">{name}</span>
      <Link href={url} target="_blank">
        <NextIcon width={10} height={18} />
      </Link>
    </article>
  );
}
