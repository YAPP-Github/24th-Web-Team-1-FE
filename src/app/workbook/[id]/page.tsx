"use client";

import { runtime } from '../../../config/runtime';

// 정적 분석 가능하게 export
export { runtime };

import Image from "next/image";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { useToast } from "@shared/components/ui/use-toast";

import CurriculumSection from "@workbook/components/CurriculumSection";
import OverviewSection from "@workbook/components/OverviewSection";
import TitleSection from "@workbook/components/TitleSection";
import WorkbookSkeleton from "@workbook/components/WorkbookSkeleton";
import { getWorkbookQueryOptions } from "@workbook/remotes/getWorkbookQueryOptions";
import { getWorkbookId } from "@workbook/utils";

import SubscribeBottomBar from "@main/components/SubscribeBottomBar";
// import { SUBSCRIBE_TITLES } from "@main/constants/main";

/** 팝업 들어오면 주석 풀 예정 */
// const SUBSCRIBE_POPUP_TITLE = (
//   <div className="h3-bold text-lg text-black">
//     <div>{SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_1}</div>
//     <div>{SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_2}</div>
//   </div>
// );

export default function WorkbookPage() {
  /** 팝업 추가 시 다시 살릴 변수들 */
  // const [isOpen, setIsOpen] = useState<boolean>(true)
  // const [email, setEmail] = useState<string>("")
  // const { form, onSubmit } = useSubscribeForm();

  const [isClient, setIsClient] = useState<boolean>(false);

  // usePathname 로 workbook id 받기
  const pathname = usePathname();
  const workbookId = getWorkbookId(pathname);

  const {
    data: workbookInfo,
    isLoading,
    isError,
  } = useQuery({
    ...getWorkbookQueryOptions(Number(workbookId)),
  });

  const { toast } = useToast();

  useEffect(function detectClient() {
    setIsClient(true);
  }, []);

  if (isLoading) return <WorkbookSkeleton />;
  if (isError) return <div>Error loading workbook</div>;

  return (
    <main className="flex h-[100vh] w-full flex-col items-center overflow-x-hidden">
      <article className="flex h-full w-full max-w-screen-sm flex-col space-y-[24px] overflow-y-scroll">
        {workbookInfo && (
          <>
            <figure>
              <Image
                src={workbookInfo.mainImageUrl}
                alt={"Workbook landing image"}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "338px" }}
              />
            </figure>
            <TitleSection
              category={workbookInfo.category}
              title={workbookInfo.title}
              editors={workbookInfo.writerIds}
            />
            <OverviewSection overview={workbookInfo.description} />
            <CurriculumSection curriculumItems={workbookInfo.articles} />
          </>
        )}
      </article>
      <SubscribeBottomBar />
    </main>
  );
}
