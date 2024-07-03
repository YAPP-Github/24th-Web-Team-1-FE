"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import TitleSection from "@shared/components/TitleSection";

import { ClientSubscribePopup } from "@workbook/components/ClientSubscribePopup";
import CurriculumSection from "@workbook/components/CurriculumSection";
import OverviewSection from "@workbook/components/OverviewSection";
import WorkbookSkeleton from "@workbook/components/WorkbookSkeleton";
import WriterInfo from "@workbook/components/WriterInfo";
import { getWorkbookQueryOptions } from "@workbook/remotes/getWorkbookQueryOptions";
import { getWorkbookId } from "@workbook/utils";

import SubscribeBottomBar from "@subscription/components/SubscribeBottomBar";

export default function WorkbookPage() {
  // usePathname 로 workbook id 받기
  const pathname = usePathname();
  const workbookId = getWorkbookId(pathname);

  const {
    data: workbookInfo,
    isLoading,
  } = useQuery({
    ...getWorkbookQueryOptions(workbookId),
  });

  if (isLoading) return <WorkbookSkeleton />;

  return (
    <main className="flex h-[100vh] w-full flex-col items-center overflow-x-hidden">
      <article className="flex h-full w-full max-w-screen-sm flex-col space-y-[24px] overflow-y-scroll">
        <ClientSubscribePopup />
        {workbookInfo && (
          <>
            <figure>
              <Image
                src={workbookInfo.mainImageUrl}
                alt={"Workbook landing image"}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", objectFit: "contain" }}
              />
            </figure>
            <TitleSection
              tagTexts={[workbookInfo.category]}
              title={workbookInfo.title}
              editorComponent={<WriterInfo writers={workbookInfo.writers} />}
              className={"px-[20px]"}
            />
            <OverviewSection overview={workbookInfo.description} />
            <CurriculumSection curriculumItems={workbookInfo.articles} />
            <SubscribeBottomBar />
          </>
        )}
      </article>
    </main>
  );
}
