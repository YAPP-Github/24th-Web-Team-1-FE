"use client"
import { useEffect, useState } from "react";

import { useToast } from "@shared/components/ui/use-toast";

import SubscribeBottomBar from "@main/components/SubscribeBottomBar";
import { SUBSCRIBE_TITLES } from "@main/constants/main";
import { useSubscribeForm } from "@main/hooks/useSubscribeForm";
import Image from "next/image";
import TitleSection from "@workbook/components/TitleSection";
import OverviewSection from "@workbook/components/OverviewSection";
import CurriculumSection from "@workbook/components/CurriculumSection";
import { getWorkbookQueryOptions } from "@workbook/remotes/getWorkbookQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { getWorkbookId } from "@workbook/utils";

const SUBSCRIBE_POPUP_TITLE = (
  <div className="text-black h3-bold text-lg">
    <div>{SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_1}</div>
    <div>{SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_2}</div>
  </div>
);


export default function WorkbookPage() {
  /** 팝업 추가 시 다시 살릴 변수들 */
  // const [isOpen, setIsOpen] = useState<boolean>(true)
  // const [email, setEmail] = useState<string>("")
  // const { form, onSubmit } = useSubscribeForm();

  const [isClient, setIsClient] = useState<boolean>(false);

  // usePathname 로 workbook id 받기
  const pathname = usePathname();
  const workbookId = getWorkbookId(pathname)

  const { data: workbookInfo, isError } = useQuery({ ...getWorkbookQueryOptions(Number(workbookId)) });

  const { toast } = useToast()

  useEffect(function detectClient() {
    setIsClient(true);
  }, []);

  return (
    <main className="flex w-full h-[100vh] flex-col items-center overflow-x-hidden">
      <div className="flex flex-col h-full space-y-[24px] overflow-y-scroll w-full max-w-screen-sm">
        {
          workbookInfo  && (
            <>
              <Image
                src={workbookInfo.mainImageUrl}
                alt={"Workbook landing image"}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: 'auto' }}
              />
              <TitleSection category={workbookInfo.category} title={workbookInfo.title} editors={workbookInfo.writerIds} />
              <OverviewSection overview={workbookInfo.description} />
              <CurriculumSection curriculumItems={workbookInfo.articles} />
            </>
          )
        }
      </div>
      <SubscribeBottomBar />
    </main>

  );
}
