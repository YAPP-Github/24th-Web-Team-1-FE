'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

import useWorkbookId from "@shared/hooks/useWorkbookId";

import { CurriculumInfo } from "@workbook/types";
interface CurriculumItemProps {
  day: number;
  item: CurriculumInfo;
}

export default function CurriculumItem({ day, item }: CurriculumItemProps) {
  const pathname = usePathname()
  const workbookId = useWorkbookId(pathname)

  return (
    <Link className="flex flex-row items-center justify-start space-x-[20px] border-b p-2.5" href={`/article/${item.id}?workbookId=${workbookId}`}>
      <span className="text-base font-bold">Day {day}</span>
      <span className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-base text-text-gray1">
        {item.title}
      </span>
    </Link>
  );
}
