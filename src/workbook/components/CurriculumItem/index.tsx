'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";

import { CurriculumInfo } from "@workbook/types";
import { getWorkbookId } from "@workbook/utils";

interface CurriculumItemProps {
  day: number;
  item: CurriculumInfo;
}

export default function CurriculumItem({ day, item }: CurriculumItemProps) {
  const pathname = usePathname()
  const [workbookId, setWorkbookId] = useState<string>("")

  useEffect(function getId() {
    return setWorkbookId(getWorkbookId(pathname));
    
  }, [pathname])
  return (
    <Link className="flex flex-row items-center justify-start space-x-[20px] border-b p-2.5" href={`/article/${item.id}?workbookId=${workbookId}`}>
      <span className="text-base font-bold">Day {day}</span>
      <span className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-base text-text-gray1">
        {item.title}
      </span>
    </Link>
  );
}
